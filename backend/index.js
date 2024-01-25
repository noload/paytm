const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const apiRoute = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", apiRoute);


app.listen(3000,()=>{
    console.log("server started .... 3000");
})