import pkg from "pg";
const { Client } = pkg;

let db;

export let connectDB = async (host, user, password, DBName) => {
  db = new Client({
    host: host,
    user: user,
    password: password,
    port: 5432,
    database: DBName,
  });

  try {
    await db.connect();
    console.log("database connection established ....");
  } catch (error) {
    console.log("error occured while connecting to database" + error);
  }
};

export let getDB = () => db;
