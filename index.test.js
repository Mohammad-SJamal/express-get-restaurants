// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const Restaurant = require('./models/index')
const app = require('./src/app');
const {seedRestaurant} = require("./seedData");


describe('./restaurant endpoint', () => {
    // Write your tests here
    test("Testing restaurant endpoint", async () => {
        const response = await request(app).get("/restaurants");
        expect(response.statusCode).toBe(200);
        const mscns = await Restaurant.findAll();
        expect(mscns.length).toEqual(JSON.parse(response.text).length);
    })

    test("Testing restaurants parameters endpoint", async () => {
        const response = await request(app).get("/restaurants/1");
        expect(response.statusCode).toBe(200);
        const mscn = await Restaurant.findByPk(1);
        expect(mscn.name).toBe(JSON.parse(response.text).name);
    })

    // test("Testing if can add new restaurants", async () => {
    //     const response = await request(app).post("/restaurants/burgermania/manhattan/burgers");
    //     expect(response.statusCode).toBe(200);
    //     expect((await Restaurant.findOne({ where : {
    //         name: "burgermania"
    //     }})).name).toBe(JSON.parse(response.text).name);
    // })

    test("Testing if can add new restaurants", async () => {
        const response = await request(app)
            .post("/restaurants")
            .send({ name: "burgermania", location: "manhattan", cuisine: "burgers"});
        expect(response.statusCode).toBe(200);
        expect((await Restaurant.findOne({ where : {
            name: "burgermania"
        }})).name).toBe(JSON.parse(response.text).name);
    })
    
    test("Testing if post can change an entry", async () => {
        const response = await request(app)
            .put("/restaurants/1")
            .send({ name: "samis", location: "queens", cuisine: "afghani"});
        expect(response.statusCode).toBe(200);
        expect((await Restaurant.findByPk(1)).name).toBe("samis");
    })

    test("Testing serverside validation for posting an entry", async () => {
        const response = await request(app)
            .post("/restaurants")
            .send({ name: "", location: "asdf", cuisine: "asdf"});
        expect(response.statusCode).toBe(200);
        console.log(response.text);
        const responseData = JSON.parse(response.text);
        console.log(responseData);
        expect(responseData.errors).toEqual([
            {
                location: "body",
                msg: "Invalid value",
                path: "name",
                type: "field",
                value: "",
            },
        ]);
    })

    test("Testing if can delete something from database", async () => {
        const response = await request(app).delete("/restaurants/1");
        expect(response.statusCode).toBe(200);
        expect(await Restaurant.findByPk(1)).toBe(null);
    })
    
    
    
    
})
