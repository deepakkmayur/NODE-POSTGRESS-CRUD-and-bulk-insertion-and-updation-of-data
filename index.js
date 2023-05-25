const express=require('express')
const studentRoute=require('./src/student/routes')
const app=express()


const port=3002
app.use(express.json())
app.use(express.urlencoded({extended:true})) 
app.use('/api/v1/students',studentRoute)

app.listen(port,()=>console.log(`server connected to port :${port}`))   