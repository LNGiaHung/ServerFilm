import { MongoClient } from "mongodb";

const express = require('express');
const body = require('body-parser');

async function start() {
  try{

    const app = express();

    const mongo = await MongoClient.connect('mongodb://localhost:27017/crm_api'); 

    await mongo.connect();

    app.db = mongo.db();

    //body parser

    app.use(body.json({
      limit: '5mb'
    }));

    //routes

    app.use('/',require('./'));

    //start sever

    app.listen(2000, () =>{
      console.log('server running on port 2000');
    });

  }
  catch(error){
    console.log(error);
  }
}

start()