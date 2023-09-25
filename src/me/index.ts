import { prisma } from "../../libs/utils/prisma";
import { Module } from "../../libs/utils/types/module"
import express from "express";

const router = express.Router();

const BASE_ROUTE = "/me";

// GET
router.get("/", async (req: express.Request, res: express.Response) => {
    const { user } = req.body.user;
    console.log( user ) ;
    const data = await prisma.users.findUnique({
        where: {
            username: user
        },
        include: {
            Rank: true,
            Role : true
        }
    })
    return res.json(data).status(200);
});
// POST
router.post("/", async (req: express.Request, res: express.Response) => {
    const { user } = req.body;
    const data = await prisma.users.create({
        //@ts-ignore
        data: {
            title: "Member",
            rank: 6,
            github_id: user.user,
            username: user.user,
            is_joined_discord: false,
            Role : {
                create: {
                    role: "Member"
                }
            }
        }
    })
    return res.json(data).status(200);
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
