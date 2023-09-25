"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../libs/utils/prisma");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
const BASE_ROUTE = "/user";
router.get("/:id", async (req, res) => {
    const id = typeof req.params.id === 'string' ? req.params.id : "";
    if (!id) {
        return res.status(400).send("INVALID REQUEST");
    }
    try {
        const data = await prisma_1.prisma.users.findUnique({
            where: { username: id },
            include: {
                Role: true,
            },
        });
        return res.json(data).status(200);
    }
    catch (e) {
        return res.status(500);
    }
});
router.get("/", async (req, res) => {
    let { roles } = req.query;
    if (roles === 'true') {
        try {
            const data = await prisma_1.prisma.users.findMany({
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
            });
            return res.json({ type: "SUCCESS", data });
        }
        catch (e) {
            return res.json({ type: "FAILED" });
        }
    }
    else {
        try {
            const data = await prisma_1.prisma.users.findMany({
                include: {
                    Role: true,
                }
            });
            return res.json({ type: "SUCCESS", data });
        }
        catch (e) {
            return res.json({ type: "FAILED" });
        }
    }
});
router.post("/", middleware_1.AuthMiddleware, async (req, res) => {
    const data = req.body;
    try {
        const response = await prisma_1.prisma.users.create({
            data
        });
        return res.json({ type: "SUCCESS", data: response });
    }
    catch (e) {
        return res.json({ type: "FAILED" });
    }
});
router.put("/", middleware_1.AuthMiddleware, async (req, res) => {
    const { id } = typeof req.body.id === 'string' ? req.body : { id: "" };
    const data = Object.assign(Object.assign({}, req.body), { rank: Number(req.body.rank), points: Number(req.body.points) });
    const username = req.body.init;
    delete data.init;
    try {
        await prisma_1.prisma.role_user.deleteMany({
            where: { username },
        });
        await prisma_1.prisma.role_user.createMany({
            data: data.Role
        });
    }
    catch (err) {
        console.log(err);
        return res.json("ERROR IN UPDATING ROLES").status(400);
    }
    try {
        delete data.Role;
        delete data.Rank;
        delete data.rank;
        delete data.user;
        const log = await prisma_1.prisma.users.update({
            where: { id },
            data,
        });
        return res.json(log).status(200);
    }
    catch (err) {
        console.log(err);
        return res.json("ERROR IN UPDATING USER").status(400);
    }
});
router.delete("/", async () => { });
const MODULE = {
    router,
    BASE_ROUTE
};
exports.default = MODULE;
//# sourceMappingURL=index.js.map