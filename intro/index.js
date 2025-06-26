import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("hello, 1st time form a container!")
})

app.listen(3000, ()=> {
    console.log("server listening on port 3000");
})