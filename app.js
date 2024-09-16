const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const indexRouter = require("./routes/index")
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouters")
const productRouter = require("./routes/productsRouter")
const flash = require("connect-flash");
const expressSession = require("express-session")

require("dotenv").config(); //require kiya dotenv ko or turant call kardiya using config

const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized:false,//guest user ka session create mat karo
        secret:process.env.EXPRESS_SESSION_SECRET
    })
)
// console.log(process.env.EXPRESS_SESSION_SECRET)
app.use(flash());//flash msgs need sessions , without session we cannot setup flash messages
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productRouter);

app.listen(3000);