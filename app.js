const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const cors=require("cors")

const app = express();
app.use(express.json());
app.use(cors({origin:true,credentials:true}));
module.exports = app;

const dbPath = path.join(__dirname, "details.db");

let db = null;

const initializeServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(5000, () => {
      console.log("Server Running Successfully at http://localhost:5000");
    });
  } catch (e) {
    console.log(`Error ${e}`);
    process.exit(1);
  }
};

initializeServer();

//API 1
app.get("/", async (request,response) => {
 
  
 const todoRequest = `
        SELECT * 
        FROM products 
        `;

  const allproducts = await db.all(todoRequest);
  console.log(allproducts);
  response.send({ allproducts });
});

//API 2
app.get("/category/Backpacks/", async (request, response) => {
  const todoRequest = `
      SELECT * 
      FROM products 
      WHERE category = 'backpacks';
  `;
 
  const Backpacks = await db.all(todoRequest);
  console.log(Backpacks);
  response.send({ Backpacks });
});

