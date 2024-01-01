import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import User from "./user"
import Auth from "./auth"
import Timeline from "./timeline"
import Admin from "./admin"
import Roles from "./roles"
import me from "./me"
import { AuthMiddleware } from "./middleware"

const PORT: number = 6969;

const app = express();

const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000', 'https://www.bitspace.org.in', 'https://www.join.bitspace.org.in'];

const corsOptions = {
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions), bodyParser.json(), cookieParser());
// // PRE-FLIGHT OPTIONS
// app.options('*', cors(corsOptions));

app.use(Auth.BASE_ROUTE, Auth.router);
app.use(Timeline.BASE_ROUTE, Timeline.router);
app.use(Roles.BASE_ROUTE, Roles.router);
app.use(User.BASE_ROUTE, User.router);
app.use(Admin.BASE_ROUTE, AuthMiddleware, Admin.router);
app.use(me.BASE_ROUTE, AuthMiddleware, me.router);
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON PORT " + PORT);
})
