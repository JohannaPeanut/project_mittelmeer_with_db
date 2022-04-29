const express = require('express');
const Landscape = require('../models/landscape');
const dummyImage = require('../public/dummy_image1.json')
const unirand = require('unirand')
const { HostedModel } = require('@runwayml/hosted-models')

const url = process.env.RUNWAY_URL
const token = process.env.RUNWAY_KEY

const router = new express.Router();

router.get('/', (req, res) => {
   res.render('home');
});

router.post('/landscape', (req, res, next) => {
  // simulate loading time with set time out for 1 sec
  setTimeout(function(){ 

  // // dev version: fetch an image from database and render view 
  // Landscape.findOne({ isUsed: false }, {}, { sort: { 'createdAt' : 1 } })
  //  .then((displayedLandscape) => {
  //    // render view with the fetched landscape from db
  //    res.render('landscape', { displayedLandscape })
  //  })
  //  .catch(error => {
  //    next(error)
  //  })
  
   // get random array using Pareto distribution
    const randomArray = unirand.pareto(1,3).distributionSync(512)
    const trunc = 0.6
  
   // model authentication
    const model = new HostedModel({
      url: url,
      token: token}) // DANGER !! - Needs to be encripted

    // create input object for model
    const inputs = {
      "z": randomArray, 
      "truncation": trunc}
    
    // run model with above data
    model.query(inputs)     
  .then((newLandscape)=> {
    console.log('model ran')
    // store new document in the database with image property landscape file
    Landscape.create({ isUsed: false, image: newLandscape.image })
  })
  .catch(error => {
    next(error)
  })
  
  // fetch oldet document from the db collection that is not already used and update it to isUsed: true
  Landscape.findOneAndUpdate({ isUsed: false }, { isUsed: true}, { sort: { 'createdAt' : 1 } })
  .then((displayedLandscape) => {
    // render view with the fetched landscape from db
    res.render('landscape', { displayedLandscape })
  })
  .catch(error => {
    next(error)
  })

}, 1000) 
});

module.exports = router;
