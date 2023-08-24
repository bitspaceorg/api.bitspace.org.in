import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies?.bs_access_token;
    if (!access_token) {
        res.json({
            message: "NO ACCESS TOKEN PROVIDED"
        })
        next();
    }
    const { data } = await axios.get("https://api.github.com/user", {
        headers: {
            Authorization: `token ${access_token}`,
        }
    })
    req.body.user = {
        access_token,
        user: data.login
    };
    next();
}
