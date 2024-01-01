"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
const timeline_1 = __importDefault(require("./timeline"));
const admin_1 = __importDefault(require("./admin"));
const roles_1 = __importDefault(require("./roles"));
const me_1 = __importDefault(require("./me"));
const middleware_1 = require("./middleware");
const PORT = 6969;
const app = (0, express_1.default)();
const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000', 'https://www.bitspace.org.in', 'https://www.join.bitspace.org.in'];
const corsOptions = {
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions), body_parser_1.default.json(), (0, cookie_parser_1.default)());
app.use(auth_1.default.BASE_ROUTE, auth_1.default.router);
app.use(timeline_1.default.BASE_ROUTE, timeline_1.default.router);
app.use(roles_1.default.BASE_ROUTE, roles_1.default.router);
app.use(user_1.default.BASE_ROUTE, user_1.default.router);
app.use(admin_1.default.BASE_ROUTE, middleware_1.AuthMiddleware, admin_1.default.router);
app.use(me_1.default.BASE_ROUTE, middleware_1.AuthMiddleware, me_1.default.router);
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON PORT " + PORT);
});
//# sourceMappingURL=index.js.map