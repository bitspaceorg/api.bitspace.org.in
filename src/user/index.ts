import express from "express";
import {prisma} from "../../libs/utils/prisma";
import { Module } from "../../libs/utils/types/module";

const router = express.Router();

const BASE_ROUTE = "/user";

// GET
router.get("/", async (req, res) => {
    const id = typeof req.query.id === 'string' ? req.query.id : "";
    console.log(id);
    
    
    if (!id) {
        return res.status(400).send("INVALID REQUEST")
    }
    try {
        const data = await prisma.users.findFirst({
            where: { id },
            include: {
                Role_user: true,
            }
        })
        return res.json({ type: "SUCCESS", data })
    } catch (e) {
        return res.json({ type: "FAILED" })
    }
})

// POST
router.post("/", async (req, res) => {
    const data = req.body;
    try {
        const response = await prisma.users.create({
            data
        })
        return res.json({ type: "SUCCESS", data: response })
    } catch (e) {
        return res.json({ type: "FAILED" })
    }
})

// PUT
router.put("/", async () => { });

// DELETE
router.delete("/", async () => { });

const MODULE: Module = {
    router,
    BASE_ROUTE
}

export default MODULE;
