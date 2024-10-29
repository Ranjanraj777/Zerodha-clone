const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");
// const path = require('path');
// const OrdersSchema = require(path.resolve(__dirname, '../schemas/OrdersSchema'));

 // Go one level up
// const body-Parser = require("body-parser");
const cors=require("cors")

require("dotenv").config();
const PORT = process.env.PORT || 3002;
const bodyParser=require("body-parser")

app.use(cors())
app.use(bodyParser.json());
// const url=process.env.MONGO_URL;

const Dbconnect = async () => {
  await mongoose.connect(
    "mongodb+srv://ranjannraj666:R8%21N6h%2cKV%25v8RfD@zerodhacluster.yrg6l.mongodb.net/zerodha"
  );
};

Dbconnect()
  .then((res) => {
    console.log("connection succesfully");
  })
  .catch((e) => {
    console.log(e);
  });

// app.get("/addpostion",async (req, res) => {

//    tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//        product: item.product,
//        name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//        price: item.price,
//        net: item.net,
//        day: item.day,
//        isLoss: item.isLoss,
//     });

//     newPosition.save();
//    });
//   res.send("Done! position");
// });


app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});


app.get("/allPositions",async(req,res)=>{
    let allPositions=await PositionsModel.find({})
    res.json(allPositions)
})

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();
  

  res.send("Order saved!");
});

app.listen(PORT, () => {
  console.log("port is listenign in 3002");
  // console.log("Db is connected")
});
