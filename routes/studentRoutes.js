import express from 'express';
import { allStudentsControllers, createStudentController, deleteStudentControllers, getStudentByIdControllers, studentUpdatingControllers} from '../controllers/studentController.js';


const studentRoutes = express.Router();

studentRoutes.post('/createStudent', createStudentController);
studentRoutes.get('/getAlllStudents',allStudentsControllers);
studentRoutes.put('/updateStudent/:id',studentUpdatingControllers);
studentRoutes.get('/getStudentById/:id', getStudentByIdControllers);
studentRoutes.delete('/deleteStudent/:id',deleteStudentControllers);



export default studentRoutes;
