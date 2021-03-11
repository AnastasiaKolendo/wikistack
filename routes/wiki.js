const express = require('express');
const routes = express.Router();
const addPage = require('../views/addPage')
const {Page} = require("../models");

routes.get('/', (req, res, next) =>{
    res.send('This is the home page');
});

routes.get('/add', (req, res, next)=>{
    console.log('hihi')
    res.send(addPage());
});

routes.post('/', async(req, res, next) =>{
    //res.json(req.body);
    console.log(req.body.content);
    try{
        const page = await Page.create({

            title: req.body.title,
            content: req.body.content,
            slug: "blabla",
            status: req.body.status,
          });
    res.redirect('/');
    } catch (error){
        next(error);
    }

});

module.exports = routes;