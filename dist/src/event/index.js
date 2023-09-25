"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../middleware");
const prisma_1 = require("../../libs/utils/prisma");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const BASE_ROUTE = "/event";
router.get("/workshops", async (_, res) => {
    const data = await prisma_1.prisma.workshop.findMany();
    let events = { upcomming: [], past: [] };
    data.forEach((ele) => {
        if (ele.is_completed)
            events.past.push(ele);
        else
            events.upcomming.push(ele);
    });
    res.send({ events });
});
router.get("/", async (req, res) => {
    const id = req.query.work_id;
    const workshop = await prisma_1.prisma.workshop.findUnique({
        where: { id },
        include: {
            Slots: {
                orderBy: {
                    date: "asc"
                }
            }
        }
    });
    res.send(workshop);
});
router.post("/workshop", middleware_1.AuthMiddleware, async (req, res) => {
    const { slot_id } = req.body;
    const user_id = req.body.user.user;
    const data = await prisma_1.prisma.workshop_user.findMany({
        where: { user_id }
    });
    if (data.length === 0) {
        const slot = await prisma_1.prisma.slots.findUnique({
            where: { id: slot_id }
        });
        if ((slot === null || slot === void 0 ? void 0 : slot.count) < (slot === null || slot === void 0 ? void 0 : slot.max_count)) {
            await prisma_1.prisma.slots.update({
                where: { id: slot_id },
                data: { count: (slot === null || slot === void 0 ? void 0 : slot.count) + 1 }
            });
            await prisma_1.prisma.workshop_user.create({
                data: {
                    Slots: {
                        connect: {
                            id: slot_id,
                        }
                    },
                    Users: {
                        connect: {
                            username: user_id
                        }
                    },
                    point: "OK"
                }
            });
            res.send({ status: true, data: "Sucessfully Registered , Check Your Mail! 🚀 " });
            return;
        }
        else {
            res.send({ status: false, data: "Sorry all the Slots are full 😔 " });
            return;
        }
    }
    else {
        res.send({ status: true, data: "Already Registered! 👍 " });
        return;
    }
});
router.put("/", async () => { });
router.delete("/", async () => { });
const MODULE = {
    router,
    BASE_ROUTE
};
exports.default = MODULE;
//# sourceMappingURL=index.js.map