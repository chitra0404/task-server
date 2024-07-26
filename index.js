const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const Routes=require('./router/route');
require('dotenv').config();

const app=express();

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
  app.use(cors({
      origin: '*'
    }));
app.use('/api',Routes)



mongoose.connect(process.env.URL)
.then(()=>console.log("connected to mongodb"))
.catch((err)=>console.log("error occured",err))

const port=5000;
app.listen(port,()=>console.log(`server start listening to the port${port}`))