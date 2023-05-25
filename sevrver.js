// const express= require('express')
// // const mongoose=require('mongoose')
// const mysql = require('mysql');
   
// const con = mysql.createConnection({
//    host: "127.0.0.1",
//    user: "yourusername",
//    password: "yourpassword"
//  });
 
//  con.connect(function(err) {
//    if (err) throw err;
//    console.log("Connected!");
//  });      

// const pg=require('pg')







// const {Client}=require('pg')
// const client= new Client({
//    // host:"localhost",
//    host:"127.0.0.1", 
//    user:"postgres",
//    port:"5432",
//    password:"deepak",
//    database:"test"
// })

// client.connect()

// client.query(`select id,name,gender from students`,(err,res)=>{       
//    if(!err){
//       console.log("1");
//       console.log(res.rows);
//    }else{
//       console.log("2");
//    console.log("error",err.message);   

//    }
//    client.end;
// })