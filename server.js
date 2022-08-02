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

//Connect Database==================================================================================

const pool = new Pool ({
    // user: '1002c',
    // password: 'Zelda@1002',
    connectionString: DATABASE_URL,
    ssl: NODE_ENV === 'production' ? {rejectUnauthorized: false} : false,
  })

//GET main forum page===============================================================================

app.get("/home", async (req, res) => {
    try {
        const clint = await pool.connect();
        const data = await pool.query('SELECT * FROM forum ORDER BY time DESC')
        res.send(data.rows);
    } catch (error) {
        res.send(error.message);
    }
})

app.get("/home/:id", async (req, res) => {
    let id = req.params.id;
    try {
      const data = await pool.query('SELECT * FROM forum WHERE post_id = $1;', [id])
      const posts = data.rows;
      if(posts.length === 0) {
          res.statusCode(404).send("Data Not Found")
      } else {
          res.send(data.rows[0]);
      }
    } catch (error) {
        res.send("Data Not Found").status(400);
    }
  });

//GET Games=========================================================================================
app.get("/prime", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM games;')
          res.send(data.rows);
        } catch (error) {
          console.error(error);
          res.send("Error" + error);
        }
})

app.get("/prime/:id", async (req, res) => {
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

//GET upgrades======================================================================================

app.get("/upgrades", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM beams, missiles, charge, visor;')
          res.send(data.rows);
        } catch (error) {
          console.error(error);
          res.send("Error" + error);
        }
})

app.get("/upgrades/beams", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM beams;')
          res.send(data.rows);
        } catch (error) {
          console.error(error);
          res.send("Error" + error);
        }
})

app.get("/upgrades/beams/:id", async (req, res) => {
    let id = req.params.id;
    try {
      const data = await pool.query('SELECT * FROM beams WHERE beams_id = $1;', [id])
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

app.get("/upgrades/missiles", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM missiles;')
          res.send(data.rows);
        } catch (error) {
          console.error(error);
          res.send("Error" + error);
        }
})

app.get("/upgrades/missiles/:id", async (req, res) => {
    let id = req.params.id;
    try {
      const data = await pool.query('SELECT * FROM missiles WHERE missile_id = $1;', [id])
      const missiles = data.rows;
      if(missiles.length === 0) {
          res.statusCode(404).send("Data Not Found")
      } else {
          res.send(data.rows[0]);
      }
    } catch (error) {
        res.send("Data Not Found").status(400);
    }
  });

app.get("/upgrades/charge", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM charge;')
          res.send(data.rows);
        } catch (error) {
          console.error(error);
          res.send("Error" + error);
        }
})

app.get("/upgrades/charge/:id", async (req, res) => {
    let id = req.params.id;
    try {
      const data = await pool.query('SELECT * FROM charge WHERE charge_id = $1;', [id])
      const charge = data.rows;
      if(charge.length === 0) {
          res.statusCode(404).send("Data Not Found")
      } else {
          res.send(data.rows[0]);
      }
    } catch (error) {
        res.send("Data Not Found").status(400);
    }
  });

app.get("/upgrades/visor", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM visor;')
          res.send(data.rows);
        } catch (error) {
          console.error(error);
          res.send("Error" + error);
        }
})

app.get("/upgrades/visor/:id", async (req, res) => {
    let id = req.params.id;
    try {
      const data = await pool.query('SELECT * FROM visor WHERE visor_id = $1;', [id])
      const visor = data.rows;
      if(visor.length === 0) {
          res.statusCode(404).send("Data Not Found")
      } else {
          res.send(data.rows[0]);
      }
    } catch (error) {
        res.send("Data Not Found").status(400);
    }
  });

//Delete============================================================================




//Listen for the server=============================================================

app.listen(PORT, () => {
    console.log(`Listening in on port ${PORT}`)
});