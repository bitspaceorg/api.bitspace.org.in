import express from "express";
import { AuthMiddleware } from "../middleware/auth";
import { prisma } from "../../libs/utils/prisma";
import { Module } from "../../libs/utils/types/module";

const router = express.Router();

const BASE_ROUTE = "/user";

// GET PARTICULAR USER
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
        if (data && !data.is_joined_discord) {
            return res.json("USER NOT JOINED DISCORD").status(500)
        }
        return res.json(data).status(200)
    } catch (e) {
        return res.status(500)
    }
})

// GET ALL USERS
router.get("/", async (req, res) => {
    let { roles } = req.query
    if (roles === 'true') {
        try {
            const data = await prisma.users.findMany({
                include: {
                    Role: true,
                },
                where: {
                    NOT: {
                        Role: {
                            some: {},
                        },
                    },
                },
            })
            return res.json({ type: "SUCCESS", data })
        } catch (e) {
            return res.json({ type: "FAILED" })
        }
    } else {
        try {
            const data = await prisma.users.findMany({
                include: {
                    Role: true,
                }
            })
            return res.json({ type: "SUCCESS", data })
        } catch (e) {
            return res.json({ type: "FAILED" })
        }
    }
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
router.put("/", AuthMiddleware, async (req, res) => {
    const { id }: { id: string } = typeof req.body.id === 'string' ? req.body : { id: "" }
    const data = { ...req.body, rank: Number(req.body.rank), points: Number(req.body.points) }
    const username = req.body.init
    delete data.init
    try {
        await prisma.role_user.deleteMany({
            where: { username },
        })
        await prisma.role_user.createMany({
            data: data.Role
        })
    } catch (err) {
        console.log(err)
        return res.json("ERROR IN UPDATING ROLES").status(400)
    }
    try {
        delete data.Role
        const log = await prisma.users.update({
            where: { id },
            data,
        })
        return res.json(log).status(200)
    } catch (err) {
        console.log(err)
        return res.json("ERROR IN UPDATING USER").status(400)
    }
});

// DELETE
router.delete("/", async () => { });

const MODULE: Module = {
    router,
    BASE_ROUTE
}

export default MODULE;

