import { prisma } from "../../libs/utils/prisma";
import { Module } from "../../libs/utils/types/module"
import express, { Response } from "express";
import axios from "axios";
import { base_url } from "../../libs/constants";

const router = express.Router();

const BASE_ROUTE = "/admin";

// GET
router.get("/", async ( _ ,res:Response) => {
    const data = await prisma.rank.findMany({
        orderBy : [
            { rank : 'asc' }
        ],
        include : {
            Users : true
        }
    })
    res.json(data)
});

// POST
router.post("/", async () => { });

// POST - STRIKE
router.post("/strike", async (req, res) => { 
    const { id } : { id: string } = req.body
    const { strike } = await prisma.users.update({
        where: {
            id,
        },
        data: {
            strike: { increment: 1 },
        }
    })
    if ( strike >= 3 ){
        const {data} = await axios.post(`${base_url}/admin/ban`, { id })
        res.json(data).status(301);
        return;
    }
    res.json({strike}).status(301)
});

// POST - BAN
router.post("/ban", async (req, res) => {
    const { id } : { id: string  } = req.body
    const bool = await prisma.users.findUnique({
        where : { id }
    })
    const data = await prisma.users.update({
        where: { id },
        data: {
            is_ban: !bool?.is_ban,
            points: 0,
        }
    })
    res.json(data).status(301)
});

// PUT
router.put("/", async () => { });

// DELETE
router.delete("/", async () => { });

const MODULE: Module = {
    router,
    BASE_ROUTE
};

export default MODULE;
