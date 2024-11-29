// entry point into backend app 
// create and initialize express app
require('dotenv').config();
const express = require("express") //import express app
const db = require("./db");

const app = express() //create instance of express app stored in variable app
// //setting middle ware
// app.use((req,res, next) => {
//     console.log("that is our middle ware");
//     next();
//     /*sending a resppnse
//      res.status(404).json({
//          status:"fail",
//     });*/

// })

app.use(express.json());

//defining routes
//specify http method get, put... app.httpmethod(url that frontend to send http request to)

//get all users
//http://localhost:4000/api/v1/users
app.get("/api/v1/users", async (req, res) =>{
    const results = await db.query("select * from Users");
    console.log(results);
    //send response
    //res.send("these are the products")
    res.json(
        results.rows
    )
});

//get individual product
//http://localhost:4000/api/v1/products/1
app.get("/api/v1/products/:id", async (req,res) => {
    const results = await db.query("select * from product where product_id = $1", [req.params.id]);
    console.log(req.params.id);
    res.json(results.rows);
});



//create restaurant
app.post("/api/v1/restaurants", (req,res)=>{
    const results = db.query("insert into users (username, password, email, full_name) values ($1,$2,$3,$4) returning *",[req.body.username, req.body.password, req.body.email, req.body.full_name]);
    res.status(201).json({                                                                            
        status: "success",
        data: {
            restaurant: "mcdonalds"
        }
    })
});


//update restaurant
app.put("/api/v1/restaurants/:id", (req,res)=>{
    console.log(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            restaurant: "mcdonalds"
        },
    })
})


//delete restaurant
app.delete("/api/v1/restaurants/:id", (req,res)=>{
    console.log(req.params.id);
    res.status(204).json({
        status: "success",
    })
})


const port = process.env.PORT || 3001; //default value is 3001 if envrionment variable not defined
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`); //!!!!!!!!!!
}); //listen to specific port


//environment variables
//package dotenv