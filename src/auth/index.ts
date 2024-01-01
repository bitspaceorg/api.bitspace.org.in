import axios from "axios";
import { client_id, client_secret } from "../../libs/constants";
import { Module } from "../../libs/utils/types/module"
import express from "express";

const router = express.Router();

const BASE_ROUTE = "/auth";

// GET
router.get("/", async () => { });

// POST
router.post("/", async () => { });

// PUT
router.put("/", async () => { });

// DELETE
router.delete("/", async () => { });

router.post("/access_token_github", async (req, res) => {
    const code = req.body?.code || "HELLO";
    try {
        const { data } = await axios.post("https://github.com/login/oauth/access_token", {
            client_id,
            client_secret,
            code
        }, {
            headers: {
                "Accept": "application/json"
            },
            withCredentials: true
        })
        res.cookie("bs_access_token", data.access_token, {})
        return res.json(data);
    } catch (err) {
    }

    return res.json({});
})

const MODULE: Module = {
    router,
    BASE_ROUTE
}

export default MODULE;
