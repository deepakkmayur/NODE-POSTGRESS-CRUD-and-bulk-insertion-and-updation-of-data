

// // INSERT INTO tmp (name,age) values ('keith', 43),('leslie', 40),('bexley',19),('casey', 6);



// // let array_values=[{name:'keith', age:43},{name:'leslie', age:40},{name:'bexley',age:19}]
// // let converted_array=[['keith',43],['leslie',40],['bexley',19]]






// let converted_array = [{name:'keith', age:43},{name:'leslie', age:40},{name:'bexley',age:19}];

// const pool=require('../../db')
// const queries=require('./queries')

// let format=require('pg-format')
// let array_values=[['keith',43],['leslie',40],['bexley',19]]

// let converted_array = array_values.map((obj) =>{
//     return [obj.name, obj.age]
//    });

// // console.log(converted_array);

// format("INSERT INTO tmp (name,age) values %L",converted_array)   






// const pool=require('../../db')
// const queries=require('./queries')

// let format=require('pg-format')
// let array_values = [{name:'keith', age:43},{name:'leslie', age:40},{name:'bexley',age:19}];

// let converted_array = array_values.map((obj) =>{
//     return [obj.name, obj.age]
//    });


// const createBulkStudents=async(req,res)=>{
//  const insertedStudents = await pool.query(format("INSERT INTO tmp (name,age) values %L",converted_array));   
//  if(existingStudents.rows.length!=0){
//     res.status(400).json('success')    
//  }else{
//       if(error) throw error
//       else res.status(200).json("error while creating") 
//  }
//  }