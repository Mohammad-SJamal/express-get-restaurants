const express = require("express");
const Restaurant = require("../models/index");
const db = require("../db/connection");
const restaurantRouter = express.Router();
const { check, validationResult } = require("express-validator");

restaurantRouter.get("/", async (req, res) => {
    let restaurants = await Restaurant.findAll();
    res.json(restaurants);
})

restaurantRouter.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    res.json(await Restaurant.findByPk(id));
})

restaurantRouter.post("/", [check("name").not().isEmpty().trim(), check("location").not().isEmpty().trim(), check("cuisine").not().isEmpty().trim()], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.json({errors: errors.array()});
    } else{
        let restaurant = await Restaurant.create({
            name: req.body.name,
            location: req.body.location,
            cuisine: req.body.cuisine
        })
        res.send(restaurant);
    }
})

restaurantRouter.put("/:id", async (req, res) => {
    let restaurant = await Restaurant.findByPk(req.params.id);
    restaurant = await restaurant.update({
        name: req.body.name,
        location: req.body.location,
        cuisine: req.body.cuisine
    })
    res.json(restaurant);
})

restaurantRouter.delete("/:id", async (req,res) => {
    let restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.destroy();
    res.json("Deleted successfully");
})

module.exports = restaurantRouter;