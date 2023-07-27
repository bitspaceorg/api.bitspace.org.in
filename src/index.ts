import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

import User from "./user"
import Auth from "./auth"

const PORT: number = 6969;

const app = express();

app.use(cors({ origin: "*", credentials: true }), bodyParser.json())

app.use(User.BASE_ROUTE, User.router);
app.use(Auth.BASE_ROUTE, Auth.router);

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON PORT " + PORT);
})
