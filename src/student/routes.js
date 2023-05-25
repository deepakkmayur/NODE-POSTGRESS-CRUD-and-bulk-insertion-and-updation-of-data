//  const express=require('express')
//  const router=express.Router() 
// const {getStudents}=require('./controller')

const {Router} =require('express')
const controller=require('./controller')   
const router= Router()

router.get('/:id',controller.getStudentsById)    
router.get('/',controller.getStudents)
router.post('/',controller.createStudents)
router.delete('/delete/:id',controller.deleteStudent)      
router.put('/update/:id',controller.updateStudent)   


router.post('/insertBulkData',controller.createBulkStudents)
router.put('/bulkDataUpdate',controller.bulkStudentsUpdate)


module.exports=router     