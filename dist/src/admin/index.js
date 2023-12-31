"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../libs/utils/prisma");
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../../libs/constants");
const router = express_1.default.Router();
const BASE_ROUTE = "/admin";
router.get("/", async (_, res) => {
    const data = await prisma_1.prisma.rank.findMany({
        orderBy: [
            { rank: 'asc' }
        ],
        include: {
            Users: true
        }
    });
    res.json(data);
});
router.post("/", async () => { });
router.post("/strike", async (req, res) => {
    const { id } = req.body;
    const { strike } = await prisma_1.prisma.users.update({
        where: {
            id,
        },
        data: {
            strike: { increment: 1 },
        }
    });
    if (strike >= 3) {
        const { data } = await axios_1.default.post(`${constants_1.base_url}/admin/ban`, { id });
        res.json(data).status(301);
        return;
    }
    res.json({ strike }).status(301);
});
router.post("/discord-strike", async (req, res) => {
    const RES_B = req.body;
    const { id, strike } = await prisma_1.prisma.users.update({
        where: {
            discord_id: RES_B.id,
        },
        data: {
            strike: { increment: 1 },
        }
    });
    if (strike >= 3) {
        const { data } = await axios_1.default.post(`${constants_1.base_url}/admin/ban`, { id });
        res.json(data).status(301);
        return;
    }
    res.json({ strike }).status(301);
});
router.post("/ban", async (req, res) => {
    const { id } = req.body;
    const bool = await prisma_1.prisma.users.findUnique({
        where: { id }
    });
    const data = await prisma_1.prisma.users.update({
        where: { id },
        data: {
            is_ban: !(bool === null || bool === void 0 ? void 0 : bool.is_ban),
            points: 0,
        }
    });
    res.json(data).status(301);
});
router.put("/", async () => { });
router.delete("/", async () => { });
const MODULE = {
    router,
    BASE_ROUTE
};
exports.default = MODULE;
//# sourceMappingURL=index.js.map