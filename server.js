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
       const data = await pool.query('SELECT * FROM forum ORDER BY time DESC');
       res.send(data.rows);
    } catch (error) {
       res.send(error.message);
    }
 });
 
//  app.get("/home/:id", async (req, res) => {
//     try {
//        const id = req.params.id;
//        const data = await pool.query('SELECT * FROM forum WHERE post_id = $1',[id]);
//        res.send(data.rows[0]);
//     } catch (err) {
//        res.send(err.message);
//     }
//  });

//GET USERs=========================================================================================
app.get("/home/users", async (req, res) => {
    try {
       const data= await pool.query('SELECT * FROM users');
       res.send(data.rows);
    } catch (error) {
       res.send(error.message);
    }
 });

 app.get("/home/users/:id", async (req, res) => {
    try {
       const id = req.params.id;
       const data = await pool.query("SELECT * FROM users WHERE user_id = $1",[id]);
       res.send(data.rows[0]);
    } catch (error) {
       res.send(error.message);
    }
 });
//GET Games=========================================================================================
app.get("/prime", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM games;')
        res.send(data.rows);
    } catch (error) {
       res.send(error.message);
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
        res.json(data.rows);
    } catch (error) {
       res.send(error.message);
    }
})

app.get("/upgrades/beams", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM beams;')
          res.send(data.rows);
        } catch (error) {
            res.send(error.message);
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
        res.send(error.message);
    }
  });

app.get("/upgrades/missiles", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM missiles;')
          res.send(data.rows);
        } catch (error) {
            res.send(error.message);
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
        res.send(error.message);
    }
  });

app.get("/upgrades/charge", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM charge;')
          res.send(data.rows);
        } catch (error) {
            res.send(error.message);
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
        res.send(error.message);
    }
  });

app.get("/upgrades/visor", async (req, res) => {
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM visor;')
          res.send(data.rows);
        } catch (error) {
            res.send(error.message);
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
        res.send(error.message);
    }
  });

//POST============================================================================
app.post("/home", async (req, res) => {
    try {
       const body = req.body;
       const username = body.username;
       const title = body.title || "Untitled";
       const message = body.post;
       const data = await pool.query("INSERT INTO forum (time, username, title, post) VALUES (now(), $1, $2, $3)", [username, title, message]);
       res.send(data.rows[0]);
    } catch (error) {
       res.send(error.message);
    }
 });

 app.post("/home/users", async (req, res) => {
    try {
       const body = req.body;
       const firstN = body.firstName;
       const lastN = body.lastName;
       const userName = body.username;
       const userEmail = body.email;
       const data = await pool.query("INSERT INTO users (firstName, lastName, username, email) VALUES ($1, $2, $3, $4)", [firstN, lastN, userName, userEmail]);
       res.send("New User Added");
    } catch (error) {
       res.send(error.message);
    }
 });

//Patch==============================================================================================

 app.patch("/home/user/:id", async (req, res) => {
    const id = req.params.id;
    try {
       const userData = await pool.query("SELECT * FROM poster WHERE poster_id = $1",[id]);
       const body = req.body;
       const first = body.firstname || userData.rows[0].firstname;
       const last = body.lastname || userData.rows[0].lastname;
       const pcID= body.username || userData.rows[0].username;
       const userEmail = body.email || userData.rows[0].email;
       const update = await pool.query("UPDATE poster SET firstName = $1, lastName = $2, username = $3, email = $4 WHERE user_id = $5", [first, last, pcID, userEmail, id]);
       res.send("Profile updated");
    } catch (error) {
       res.send(error.message);
    }
 });
 
 //DELETE============================================================================================
 app.delete("/home/:id", async (req, res) => {
    try {
       const id = req.params.id;
       const deletePost = await pool.query("DELETE FROM forum WHERE post_id = $1",[id]);
       res.send("Thanks for cleaning out your trash");
    } catch (error) {
       res.send(error.message);
    }
 });
 
 app.delete("/home/users/:id", async (req, res) => {
    try {
       const id = req.params.id;
       const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1",[id]);
       res.send("We didn't want you anyways");
    } catch (err) {
       res.send(err.message);
    }
 });
//Listen for the server==============================================================================

app.listen(PORT, () => {
    console.log(`Listening in on port ${PORT}`)
});