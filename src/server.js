require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connect = require("../config/db")
const PORT = process.env.PORT || 8080;
const authRoute = require("../routes/auth/auth.routes");
const formRoute = require("../routes/form/form.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/auths" , authRoute);
app.use("/forms" , formRoute);

app.listen(PORT, async() => {
    await connect();
    console.log(`Litening to port : ${PORT}`)
})