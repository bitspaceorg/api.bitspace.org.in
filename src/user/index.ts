import express from "express";
import { prisma } from "../../libs/utils/prisma";
import { Module } from "../../libs/utils/types/module";
import { AuthMiddleware } from "src/middleware/auth";

const router = express.Router();

const BASE_ROUTE = "/user";

// GET SPECIFIC USER
router.get("/:id", async (req, res) => {
    const id = typeof req.params.id === 'string' ? req.params.id : "";
    if (!id) {
        return res.status(400).send("INVALID REQUEST")
    }
    try {
        const data = await prisma.users.findUnique({
            where: { id },
            include: {
                Role: true,
            },
        })
        return res.json(data).status(200)
    } catch (e) {
        return res.status(500)
    }
})

// GET ALL USERS
router.get("/", async (req, res) => {
    const { roles } = req.query
    if (!roles || roles == 'false') {
        try {
            const data = await prisma.users.findMany({
                include: {
                    Role: true,
                },
            })
            return res.json(data).status(200)
        } catch (e) {
            return res.status(500)
        }
    } else if (roles === 'true') {
        try {
            const data = await prisma.users.findMany({
                include: {
                    Role: true,
                },
                // GET ONLY THE USERS HAVING SOME ROLES
                where: {
                    Role: {
                        some: {},
                    },
                },
            })
            return res.json(data).status(200)
        } catch (e) {
            return res.status(500)
        }
    }
    return res.status(500).json({ error: 500 })
})

// POST
router.post("/", AuthMiddleware, async (req, res) => {
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
