const express = require("express")
const gatsby = require("gatsby-plugin-nodejs")
var cors = require("cors")
var db = require("./config/database")

const app = express()

gatsby.prepare({ app }, () => {
  // This is to allow our api for cross-origin resource sharing
  app.use(cors())

  // This is to allow our api for parsing json
  app.use(express.json())

  // This is to allow our api to receive data from a client app
  app.use(
    express.urlencoded({
      extended: true,
    })
  )

  // Here you can define your routes
  app.get("/try", (req, res) => {
    res.send("Hey World...i will travel youuuuuuu")
  })

  app.get("/tbl_login", (req, res) => {
    let sql = "SELECT * FROM tbl_login"

    db.query(sql, (err, result) => {
      if (!err) {
        res.send(result)
      }
      if (err) {
        res.status(400).send(err)
        return
      }
    })
  })

  app.get("/homepage", (req, res) => {
    // const homepageText = req.body.homepageText
    const sql = "SELECT * FROM tbl_homepage"

    db.query(sql, (err, result) => {
      if (!err) {
        res.send(result)
      }
    })
  })

  app.post("/api/insert", (req, res) => {
    const textUpdated = req.body.textUpdated
    const sql = "INSERT INTO tbl_homepage VALUES tryinsert"

    db.query(sql, (err, result) => {
      if (!err) {
        res.send(result)
      }
    })
  })
})

const port = process.env.PORT || 1337

app.listen(port, () => console.log(`listening on port ${port}`))