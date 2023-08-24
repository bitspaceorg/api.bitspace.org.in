"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../libs/utils/prisma");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const BASE_ROUTE = "/roles";
router.get("/", async (_, res) => {
    let roles;
    try {
        roles = await prisma_1.prisma.role.findMany();
    }
    catch (err) {
        return res.json(err).status(400);
    }
    return res.json(roles).status(200);
});
router.post("/", async () => { });
router.put("/", async () => { });
router.delete("/", async () => { });
const MODULE = {
    router,
    BASE_ROUTE
};
exports.default = MODULE;
//# sourceMappingURL=index.js.map