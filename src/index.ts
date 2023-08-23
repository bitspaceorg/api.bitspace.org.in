import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

import User from "./user"
import Auth from "./auth"
import Timeline from "./timeline"
import Admin from "./admin"
import me from "./me"
import { AuthMiddleware } from "./middleware/auth"

const PORT: number = 6969;

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }), bodyParser.json(), cookieParser());

app.use(Auth.BASE_ROUTE, Auth.router);
app.use(Timeline.BASE_ROUTE, Timeline.router);
app.use(User.BASE_ROUTE, AuthMiddleware, User.router);
app.use(Admin.BASE_ROUTE, AuthMiddleware, Admin.router);
app.use(me.BASE_ROUTE, AuthMiddleware, me.router);

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON PORT " + PORT);
})
