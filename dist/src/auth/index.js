"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../../libs/constants");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const BASE_ROUTE = "/auth";
router.get("/", async () => { });
router.post("/", async () => { });
router.put("/", async () => { });
router.delete("/", async () => { });
router.post("/access_token_github", async (req, res) => {
    var _a;
    const code = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.code) || "HELLO";
    console.log(code);
    try {
        const { data } = await axios_1.default.post("https://github.com/login/oauth/access_token", {
            client_id: constants_1.client_id,
            client_secret: constants_1.client_secret,
            code
        }, {
            headers: {
                "Accept": "application/json"
            },
            withCredentials: true
        });
        console.log(data);
        res.cookie("bs_access_token", data.access_token, {});
        return res.json(data);
    }
    catch (err) {
    }
    return res.json({});
});
const MODULE = {
    router,
    BASE_ROUTE
};
exports.default = MODULE;
//# sourceMappingURL=index.js.map