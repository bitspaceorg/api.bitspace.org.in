import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies?.bs_access_token;
    if (!access_token) {
        res.json({
            status: "BS-NAT",
            message: "NO ACCESS TOKEN PROVIDED"
        })
        next();
    }
    try {
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
    } catch (err) {
        res.json({
            status: "BS-IAT",
            message: "INVALID ACCESS TOKEN"
        })
        next();
    }
    next();
}
