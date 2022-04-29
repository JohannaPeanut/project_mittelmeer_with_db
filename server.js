const mongoose = require('mongoose');
const app = require('./app');

const PORT = Number(process.env.PORT, 10);
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 8080, () => console.log('All OK'));
  })
  .catch((error) => {
    console.error(
      `There was an error connecting the database to URI "${MONGODB_URI}"`
    );
  });
