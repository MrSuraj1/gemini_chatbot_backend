const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const chatRoutes = require("./routes/chatroute");
const mongoose = require('mongoose');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);


const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Server Error",
  });
};

app.use(errorHandler);

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI).then(()=>{
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});}
).catch((err)=>{
    console.log(err , "ye hai err pgl hai ");
}) 
