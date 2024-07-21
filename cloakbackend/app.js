// modules import
const express = require("express")
const dotenv = require("dotenv")
var cors = require('cors')
const app = express()
dotenv.config({ path: './config.env' })

// dependencies import
require("./db/conn")
// const Credential = require("./model/credentialSchema")

// linking the router = middleware
app.use(express.json())
app.use(cors())
app.use(require('./router/auth'));


// envs definition

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
