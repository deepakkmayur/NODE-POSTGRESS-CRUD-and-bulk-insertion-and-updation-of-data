const pool=require('../../db')
const queries=require('./queries')
const format = require('pg-format');




const getStudents=(req,res)=>{
   pool.query(queries.getstudentsQuery,(error,result)=>{
      if(error){
         console.log(error);
         throw error
      }else{
         console.log(result);
         res.status(200).json(result.rows)
      }
   })
}




const getStudentsById=(req,res)=>{
   const id =parseInt(req.params.id);
   // const id =req.params.id;
   console.log(typeof id);
   pool.query("SELECT * FROM students WHERE id=$1", [id],(error,result)=>{                  
      if(error){
         console.log(error);
         throw error
      }else{
         console.log(result);
         res.status(200).json(result.rows)
      }
   })
}


 

const createStudents=async(req,res)=>{
  const {name,email,age,dob}=req.body
const existingStudents = await pool.query("SELECT * FROM students WHERE email=$1",[email]);   
if(existingStudents.rows.length!=0){
   res.status(400).json(`email ${existingStudents.rows[0].email} already exists`)    
}else{
   await pool.query("INSERT INTO students (name,email,age,dob) Values ($1,$2,$3,$4)",[name,email,age,dob],(error,result)=>{
     if(error) throw error
     else res.status(200).json("new user created") 
   })
}
}



const deleteStudent=async(req,res)=>{
   let id=req.params.id  
      await pool.query("SELECT * FROM students WHERE id=$1",[id],async(error,result)=>{
        if(result.rows.length!=0){
             await pool.query("DELETE FROM students WHERE id=$1",[id],(error,result)=>{
            if(error){
             throw error
             }else{
              res.status(200).json("deleted successfully")   
           }
             })
         }else{
            res.status(400).json("no user found")   
         }
      })
}



const updateStudent=async(req,res)=>{ 
 let id=req.params.id 
 let {name}=req.body 
try {
   await pool.query("SELECT * FROM students WHERE id=$1",[id],async(error,result)=>{
      if(result.rows.length!=0){
        // query1 = `UPDATE students SET name='${name}',email='${email}' WHERE id=${id} RETURNING *`;
        // console.log(query1);
        // await pool.query(query1, (error, result) => {
         await pool.query("UPDATE students SET name=$1 WHERE id=$2 RETURNING *",[name,id],(error,result)=>{  
           if(error){ 
              throw error
           }else{
              res.status(200).json({message:"successfully upadated",output:result.rows})
           } 
         })
      }else{
        res.status(400).json("no user found")
      } 
   }) 
} catch (error) {
   res.status(500).json(error)
}
}




const createBulkStudents=async(req,res)=>{
   // console.log("////////////////",typeof req.body[0].Age);
    let array_values=req.body
      try {
        const formattedData = array_values.map(obj => [obj.name, obj.Age]);
        console.log('formattedData',formattedData)
        const insertedStudents = await pool.query(format("INSERT INTO student_details (name, age) VALUES %L", formattedData));
        if (insertedStudents.rowCount > 0) {
          res.status(200).json('success');
        } else {
          res.status(400).json('error while uploading the details');
        }
      } catch (error) {
        console.error(error);
        res.status(500).json('error while creating');
      }
    };



    

   // const bulkStudentsUpdate = async (req, res) => {
   //    try {
   //      const array_values = req.body;
   //      if (!Array.isArray(array_values)) {
   //        return res.status(400).json('Invalid request body');
   //      }
    
   //      const formattedData = array_values.map(obj => [obj.student_id, obj.name,obj.Age]);
    
   //      await pool.query(format('UPDATE student_details AS s SET name = tmp.name, age = tmp.age::int FROM (VALUES %L) AS tmp(student_id, name, age) WHERE s.student_id = tmp.student_id::int', formattedData));
    
   //      res.status(200).json('success');
   //    } catch (error) {
   //      console.error(error);
   //      res.status(500).json('error while updating the details');
   //    }
   //  };



const bulkStudentsUpdate = async (req, res) => {
  try {
    const arrayValues = req.body;
    if (!Array.isArray(arrayValues)) {
      return res.status(400).json('Invalid request body');
    }
    const formattedData = arrayValues.map(obj => [obj.student_id, obj.name, obj.Age]);
    const formattedQuery = format('UPDATE student_details SET name = tmp.name, age = tmp.age::integer FROM (VALUES %L) AS tmp(student_id, name, age) WHERE student_details.student_id = tmp.student_id::integer', formattedData);
    let ans=await pool.query(formattedQuery);  
    console.log(ans.rowCount);
       res.status(200).json('success');

    // await pool.query("UPDATE student_details SET name = tmp.name, age = tmp.age FROM (VALUES (1, 'Deepak k m', 100), (2, 'Jane Smith', 30)) AS tmp(student_id, name, age) WHERE student_details.student_id = tmp.student_id");
   //  if(ans.rowCount>0){
   //     res.status(200).json('success');
   //  }else{
   //    res.status(400).json("error in updation")
   //  }
  } catch (error) {    
    console.error(error);
    res.status(500).json('error while updating the details');
  }
}; 

    

    


module.exports={getStudents,getStudentsById,createStudents,deleteStudent,updateStudent,createBulkStudents,bulkStudentsUpdate}


