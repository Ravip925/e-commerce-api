const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const stripeRoute = require("./routes/stripe");


app.use(cors());
mongoose
  .connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },)
  .then(() => {
    console.log("db connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

  
  app.use(express.json())

  app.use("/api/auth", authRoute); 
  app.use("/api/products", productRoute); 
  app.use("/api/checkout", stripeRoute); 

app.listen(process.env.PORT || 8000, () => {
  console.log("server is running");
});
 