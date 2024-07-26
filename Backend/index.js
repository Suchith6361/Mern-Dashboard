const express = require("express");
require("./DataBase/config");
const app = express();
const User = require("./DataBase/user");
const Product = require("./DataBase/Product");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  const result = await user.save();
  res.send(result);
});

app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body).select("-password");
  if (user) {
    res.send(user);
  } else {
    res.send("User not found");
  }
});

app.post("/product", async (req, res) => {
  const product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/getProduct", async (req, res) => {
  let product = await Product.find();
  if (product.length > 0) {
    res.send(product);
  } else {
    res.send({ Result: "No product found" });
  }
});

app.delete("/products/:id", async(req, res) => {
 
  const result= await Product.deleteOne({_id: req.params.id});
  res.send(result);
});

app.get("/products/:id", async(req, res) => {
 
  const result= await Product.findOne({_id: req.params.id});
  if(result){
  res.send(result);
  }
  else{
    res.send({Result: "No product found"});
  }
});

app.put("/products/:id", async(req, res) => {
  let result=await Product.updateOne(
    {_id: req.params.id},
    {
      $set:req.body
    }
  )
  res.send(result);
});

app.get("/search/:key",async(req,res)=>{
  let result=await Product.find({
   "$or":[
      { name:{ $regex: req.params.key}},
      { price:{ $regex: req.params.key}},
      { category:{ $regex: req.params.key}},
      { company:{ $regex: req.params.key}}
      
   ]
  });
  res.send(result);
})

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
