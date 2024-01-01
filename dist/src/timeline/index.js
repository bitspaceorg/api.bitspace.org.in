"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../libs/utils/prisma");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const BASE_ROUTE = "/timeline";
router.get("/", async (_, res) => {
    console.log('here', 1);
    const data = await prisma_1.prisma.year.findMany({
        include: {
            timelines: {
                orderBy: {
                    date: 'asc',
                },
            },
        },
    });
    let response = [];
    data.forEach((element) => {
        let dict = { events: [], year: 0, };
        dict['year'] = element.id;
        element.timelines.forEach((ele) => {
            let obj = {
                date: ele.date || new Date(0),
                title: ele.title || '',
                content: ele.content || [],
                id: ele.id || 0
            };
            dict.events.push(obj);
        });
        response.push(dict);
    });
    res.json(response).status(301);
});
router.post("/", auth_1.AuthMiddleware, async (req, res) => {
    const { title, content } = req.body;
    let { date } = req.body;
    date = date ? new Date(date) : new Date(Date.now());
    let { year_id } = req.body;
    year_id = year_id !== null && year_id !== void 0 ? year_id : (new Date(date)).getFullYear();
    const check = await prisma_1.prisma.year.findUnique({
        where: {
            id: year_id,
        },
    });
    let data;
    if (check)
        data = await prisma_1.prisma.timeline.create({
            data: {
                date,
                title,
                content,
                year_id,
            }
        });
    else {
        await prisma_1.prisma.year.create({
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
        });
    }
    res.json({ data });
});
router.put("/", auth_1.AuthMiddleware, async (req, res) => {
    const { id, title, content } = req.body;
    const data = await prisma_1.prisma.timeline.update({
        where: {
            id,
        },
        data: {
            title,
            content,
        }
    });
    res.json({ data }).status(200);
});
router.delete("/", auth_1.AuthMiddleware, async (req, res) => {
    const { id } = req.body;
    const data = await prisma_1.prisma.timeline.delete({
        where: {
            id
        },
    });
    res.json({ data, }).status(200);
});
const MODULE = {
    router,
    BASE_ROUTE
};
exports.default = MODULE;
//# sourceMappingURL=index.js.map