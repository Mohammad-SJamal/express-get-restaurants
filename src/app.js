const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:


app.use(express.json());
app.use(express.urlencoded());

app.get("/restaurants", async (req, res) => {
    let restaurants = await Restaurant.findAll();
    res.json(restaurants);
})

app.get("/restaurants/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    res.json(await Restaurant.findByPk(id));
})

app.post("/restaurants/:name/:location/:cuisine", async (req, res) => {
    let restaurant = await Restaurant.create({
        name: req.params.name,
        location: req.params.location,
        cuisine: req.params.cuisine
    })
    res.send(restaurant);
})

app.put("/restaurants/:id/:name/:location/:cuisine", async (req, res) => {
    let restaurant = await Restaurant.findByPk(req.params.id);
    restaurant = await restaurant.update({
        name: req.params.name,
        location: req.params.location,
        cuisine: req.params.cuisine
    })
    res.json(restaurant);
})

app.delete("/restaurants/:id", async (req,res) => {
    let restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.destroy();
    res.json("Deleted successfully");
})


module.exports = app;
