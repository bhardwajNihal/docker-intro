import express from "express";

const app = express();
app.use(express.json());

// connecting to local mongodb instance
import mongoose from "mongoose";
import { User } from "./db.js";

app.get("/", (req, res) => {
    res.send("hello, 1st time form a container!")
})

app.post("/signup", async(req,res) => {

    try {
        const {username, password, age} = req.body;
    
        await User.create({
            username,
            password,
            age
        })
        
        res.send("user signed up!")
    } catch (error) {
        console.log(error);
        
    }

})
mongoose.connect("mongodb://my_mongodb:27017/test-1")
  .then(() => {
    console.log("✅ DB connected!");
    app.listen(3000, () => console.log("🚀 Server running on port 3000"));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });