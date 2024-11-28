import {
  deleteStudentService,
  getStudentByIdService,
  gettingAllStudentsService,
  studentCreatingService,
  updateStudentService,
} from "../services/studentServices.js";

export const createStudentController = async (req, res) => {
  const { student_name, email, gender, age } = req.body;
  console.log(student_name, email, gender, age);

  try {
    const newStudent = await studentCreatingService(
      student_name,
      email,
      gender,
      age
    );
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error creating student: ${error.message}`,
    });
  }
};

// this is for getting all students data;

export const allStudentsControllers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const data = await gettingAllStudentsService({ page, limit });
    // console.log(page,limit)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const studentUpdatingControllers = async (req, res) => {
  let { id } = req.params;
  try {
    const student = await updateStudentService(id, req.body);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getStudentByIdControllers = async (req, res) => {
  try {
    const student = await getStudentByIdService(req.params.id);

    if (!student || student.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.log("Error occurred while getting student by ID: " + error.message);
    res.status(500).json({ error: "Server error" }); 
  }
};

export let deleteStudentControllers = async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await deleteStudentService(id);
    if (!rowsDeleted) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

