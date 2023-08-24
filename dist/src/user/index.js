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
            where: { id },
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
    const { roles } = req.query;
    if (!roles || roles == 'false') {
        try {
            const data = await prisma_1.prisma.users.findMany({
                include: {
                    Role: true,
                },
            });
            return res.json(data).status(200);
        }
        catch (e) {
            return res.status(500);
        }
    }
    else if (roles === 'true') {
        try {
            const data = await prisma_1.prisma.users.findMany({
                include: {
                    Role: true,
                },
                where: {
                    Role: {
                        some: {},
                    },
                },
            });
            return res.json(data).status(200);
        }
        catch (e) {
            return res.status(500);
        }
    }
    return res.status(500).json({ error: 500 });
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
router.put("/", async () => { });
router.delete("/", async () => { });
const MODULE = {
    router,
    BASE_ROUTE
};
exports.default = MODULE;
//# sourceMappingURL=index.js.map