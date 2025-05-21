const express = require("express");
const Restaurant = require("../models/index");
const db = require("../db/connection");
const restaurantRouter = express.Router();

restaurantRouter.get("/", async (req, res) => {
    let restaurants = await Restaurant.findAll();
    res.json(restaurants);
})

restaurantRouter.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    res.json(await Restaurant.findByPk(id));
})

restaurantRouter.post("/:name/:location/:cuisine", async (req, res) => {
    let restaurant = await Restaurant.create({
        name: req.params.name,
        location: req.params.location,
        cuisine: req.params.cuisine
    })
    res.send(restaurant);
})

restaurantRouter.put("/:id/:name/:location/:cuisine", async (req, res) => {
    let restaurant = await Restaurant.findByPk(req.params.id);
    restaurant = await restaurant.update({
        name: req.params.name,
        location: req.params.location,
        cuisine: req.params.cuisine
    })
    res.json(restaurant);
})

restaurantRouter.delete("/:id", async (req,res) => {
    let restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.destroy();
    res.json("Deleted successfully");
})

module.exports = restaurantRouter;