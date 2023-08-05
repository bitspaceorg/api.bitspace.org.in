import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

// import User from "./user"
import Auth from "./auth"
import Timeline from "./timeline"
import Admin from "./admin"

const PORT: number = 6969;

const app = express();

app.use(cors({ origin: "*", credentials: true }), bodyParser.json())

// app.use(User.BASE_ROUTE, User.router);
app.use(Auth.BASE_ROUTE, Auth.router);
app.use(Timeline.BASE_ROUTE, Timeline.router);
app.use(Admin.BASE_ROUTE, Admin.router);

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON PORT " + PORT);
})
