"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const axios_1 = __importDefault(require("axios"));
const AuthMiddleware = async (req, res, next) => {
    var _a;
    const access_token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.bs_access_token;
    if (!access_token) {
        res.json({
            message: "NO ACCESS TOKEN PROVIDED"
        });
        next();
    }
    const { data } = await axios_1.default.get("https://api.github.com/user", {
        headers: {
            Authorization: `token ${access_token}`,
        }
    });
    req.body.user = {
        access_token,
        user: data.login
    };
    next();
};
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=index.js.map