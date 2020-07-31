const path = require('path');
const multer = require('multer');
const fs = require('fs');
const express = require('express')

module.exports = async (app, express) => {
  const data = await require('./translator');
  app.use('/assets', express.static(path.join(__dirname, 'assets')));
  app.get('/', (req, res, next) => {
    res.render('teams', {
      layout: 'index',
      data: {title: 'home', teams: data.pages[0], pages: data.pages},
    });
  });
  app.get('/teams', function(req, res) {
    console.log(req.params)
    res.render('teams', {
      layout: 'index',
      data: {title: 'home', teams: data.pages[1], pages: data.pages},
    });
  })
};
