//Set Dependencies==================================================================

const express = require('express');
const fs = require('fs');
const { Pool } = require('pg');
const dotenv = require("dotenv")
const cors = require("cors")
const app = express();
dotenv.config();
const { DATABASE_URL, NODE_ENV, PORT } = process.env;

//MiddleWare========================================================================

app.use(express.static("static"));
app.use(express.json());
app.use(cors())

//Connect Database==================================================================

const pool = new Pool ({
    // user: '1002c',
    // password: 'Zelda@1002',
    connectionString: DATABASE_URL,
    ssl: NODE_ENV === 'production' ? {rejectUnauthorized: false} : false,
  })

//GET===============================================================================

app.get("/games", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM games;')
          res.send(data.rows);
        } catch (error) {
          console.error(error);
          res.send("Error" + error);
        }
})

app.get("/games/:id", async (req, res) => {
    let id = req.params.id;
    try {
      const data = await pool.query('SELECT * FROM games WHERE game_id = $1;', [id])
      const games = data.rows;
      if(games.length === 0) {
          res.statusCode(404).send("Data Not Found")
      } else {
          res.send(data.rows[0]);
      }
    } catch (error) {
        res.send("Data Not Found").status(400);
    }
  });

app.get("/beams", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM beams;')
          res.send(data.rows);
        } catch (error) {
          console.error(error);
          res.send("Error" + error);
        }
})

app.get("/beams/:id", async (req, res) => {
    let id = req.params.id;
    try {
      const data = await pool.query('SELECT * FROM beams WHERE beam_id = $1;', [id])
      const beams = data.rows;
      if(beams.length === 0) {
          res.statusCode(404).send("Data Not Found")
      } else {
          res.send(data.rows[0]);
      }
    } catch (error) {
        res.send("Data Not Found").status(400);
    }
  });

app.get("/missiles", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM missiles;')
          res.send(data.rows);
        } catch (error) {
          console.error(error);
          res.send("Error" + error);
        }
})

app.get("/charge", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM charge;')
          res.send(data.rows);
        } catch (error) {
          console.error(error);
          res.send("Error" + error);
        }
})

app.get("/visor", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM visor;')
          res.send(data.rows);
        } catch (error) {
          console.error(error);
          res.send("Error" + error);
        }
})

//Listen for the server=============================================================

app.listen(PORT, () => {
    console.log(`Listening in on port ${PORT}`)
});