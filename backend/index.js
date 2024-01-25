const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const { PORT } = require("./config");
app.use(cors());
const apiRoute = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", apiRoute);

app.listen(PORT, () => {
  console.log(`server started .... ${PORT}`);
});
