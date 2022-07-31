# Remoteness (UI for AI image generator)

Link: http://www.remoteness.art/landscape

## App using JavaScript, Express.js, NodeJS, HTML, CSS, MongoDB, REST-API, StyleGAN2, RunwayML API

## image generator for landscapes, UI for fine-tuned Generative adversarial network (StyleGAN2)

## CRUD

- Create
- Read
- Update

## Archive generated images in Database

Database: landscapes

Collection: landscapes

### Pages

Each is going to render a view. One template per page.

- / -> Home page. Displays an empty frame, button, info-link
- /landscape -> displays fetched image from database

### Route Handlers

- GET - '/' -> render Home page
- POST - '/landscape'
  -> RunwayMLAPI call -> generates new landscape image
  -> Landscape.findOneAndUpdate({ isUsed: false }, { isUsed: true}, { sort: { 'createdAt' : 1 } }) -> fetches the oldest image from DB
  -> displays this image

### Models

Landscape

- image: {
  type: String,
  required: true }
- isUsed: {
  type: Boolean,
  required: true }
