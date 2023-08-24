import { Module } from "../../libs/utils/types/module"
import { prisma } from "../../libs/utils/prisma";
import express from "express";

const router = express.Router();

const BASE_ROUTE = "/roles";

// GET
router.get("/", async (_, res) => {
    let roles
    try {
        roles = await prisma.role.findMany()
    } catch(err) {
        return res.json(err).status(400)
    }
    return res.json(roles).status(200)
});

// POST
router.post("/", async () => { });

// PUT
router.put("/", async () => { });

// DELETE
router.delete("/", async () => { });

const MODULE: Module = {
    router,
    BASE_ROUTE
};

export default MODULE;
