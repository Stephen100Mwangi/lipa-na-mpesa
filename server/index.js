const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const tokenRouter = require('./routes/token');

dotenv.config();

const app = express();
app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})

app.use(express.json());
app.get("/",(req,res)=>{
    console.log("Hello from Safaricom");
    res.send({message:"Hello Developer"})
})

app.use(cors());
app.use("/token", tokenRouter);
