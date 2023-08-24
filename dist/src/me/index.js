"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../libs/utils/prisma");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const BASE_ROUTE = "/me";
router.get("/", async (req, res) => {
    const { user } = req.body.user;
    const data = await prisma_1.prisma.users.findUnique({
        where: {
            username: user
        },
        include: {
            Rank: true,
            Role: true
        }
    });
    return res.json(data).status(200);
});
router.post("/", async (req, res) => {
    const { user } = req.body;
    const data = await prisma_1.prisma.users.create({
        data: {
            title: "Member",
            rank: 6,
            github_id: user.user,
            username: user.user,
            is_joined_discord: false,
            Role: {
                create: {
                    role: "Member"
                }
            }
        }
    });
    return res.json(data).status(200);
});
router.put("/", async () => { });
router.delete("/", async () => { });
const MODULE = {
    router,
    BASE_ROUTE
};
exports.default = MODULE;
//# sourceMappingURL=index.js.map