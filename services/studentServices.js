import { getDB } from "../db/connection.js";

export let studentCreatingService = async (student_name, email, gender, age) => {
  let query = `
    INSERT INTO students (student_name,email,gender,age)
    VALUES ($1, $2, $3,$4)
    RETURNING *;
  `;
  let values = [student_name, email, gender, age];

  try {
    let db = getDB(); // Access the connected client
    let result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Database Error: ${error.message}`);
  }
};
export const gettingAllStudentsService = async ({ page, limit }) => {
  const offset = (page - 1) * limit;
  try {
    const db = getDB();
    const students = await db.query(
      `SELECT * FROM students ORDER BY student_id DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    const total = await db.query(`SELECT COUNT(*) FROM students`);
    return {
      students: students.rows,
      total: parseInt(total.rows[0].count, 10),
    };
  } catch (error) {
    console.error("Error fetching students:", error.message);
    throw error;
  }
};
export const updateStudentService = async (id, data) => {
  const { student_name, email, gender, age } = data;
  const db = getDB();
  
  try {
    const query = `
      UPDATE students 
      SET student_name = $2, email = $3, gender = $4, age = $5, updated_at = NOW() 
      WHERE student_id = $1 
      RETURNING *`;
    
    const params = [id, student_name, email, gender, age];
    
    const result = await db.query(query, params);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error("No student found with the provided ID.");
    }
  } catch (error) {
    console.error(`Error occurred while updating student: ${error.message}`);
    throw error; 
  }
};

export const getStudentByIdService = async (id) => {
  try {
    const db = getDB();  // Ensure getDB() correctly establishes the DB connection
    const result = await db.query(
      `SELECT s.*, m.subject_name, m.marks_obtained
       FROM students s
       LEFT JOIN marks m ON s.student_id = m.student_id
       WHERE s.student_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error("Student not found.");
    }

    // Assuming the result contains only one student (single record per student)
    return result.rows[0];  // Returning the first student record (since student_id is unique)

  } catch (error) {
    console.error("Error fetching student by ID:", error.message);
    throw error;  // Rethrow the error so it can be handled by the caller
  }
};

export let deleteStudentService = async (id) => {
  const db = getDB(); // Get the database connection

  const query = `DELETE FROM students WHERE student_id = $1 RETURNING *;`;

  try {
    const result = await db.query(query, [id]);

    if (result.rowCount === 0) {
      throw new Error("Student not found");
    }

    return result.rows[0]; // Return the deleted student data, or success message
  } catch (error) {
    console.error("Error deleting student:", error.message);
    throw error;
  }
};


