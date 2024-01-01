import { Module } from "../../libs/utils/types/module"
import express from "express";
import { prisma } from "../../libs/utils/prisma";
import { value, major, timelines } from "./types";
import { AuthMiddleware } from "../middleware/auth";

const router = express.Router();

const BASE_ROUTE = "/timeline";

// GET
router.get("/", async (_, res) => {
    console.log('here', 1)
    const data: Array<timelines> = await prisma.year.findMany({
        include: {
            timelines: {
                orderBy: {
                    date: 'asc',
                },
            },
        },
    })
    let response: Array<major> = []
    data.forEach((element: timelines) => {
        let dict: major = { events: [], year: 0, }
        dict['year'] = element.id
        element.timelines.forEach((ele: any) => {
            let obj: value = {
                date: ele.date || new Date(0),
                title: ele.title || '',
                content: ele.content || [],
                id: ele.id || 0
            }
            dict.events.push(obj)
        })
        response.push(dict)
    });
    res.json(response).status(301)
});

// POST
router.post("/", AuthMiddleware, async (req, res) => {
    const { title, content }: { title: string, content: Array<string> } = req.body
    let { date }: { date: Date } = req.body
    date = date ? new Date(date) : new Date(Date.now())
    let { year_id }: { year_id: number } = req.body
    year_id = year_id ?? (new Date(date)).getFullYear()

    const check = await prisma.year.findUnique({
        where: {
            id: year_id,
        },
    })

    let data

    if (check) data = await prisma.timeline.create({
        data: {
            date,
            title,
            content,
            year_id,
        }
    })
    else {
        await prisma.year.create({
            data: {
                id: year_id,
                timelines: {
                    create: {
                        date,
                        title,
                        content,
                    }
                }
            }
        })
    }
    res.json({ data })
});

// PUT
router.put("/", AuthMiddleware, async (req, res) => {
    const { id, title, content } = req.body
    const data = await prisma.timeline.update({
        where: {
            id,
        },
        data: {
            title,
            content,
        }
    })
    res.json({ data }).status(200)
});

// DELETE
router.delete("/", AuthMiddleware, async (req, res) => {
    const { id } = req.body
    const data = await prisma.timeline.delete({
        where: {
            id
        },
    })
    res.json({ data, }).status(200)
});

const MODULE: Module = {
    router,
    BASE_ROUTE
};

export default MODULE;
