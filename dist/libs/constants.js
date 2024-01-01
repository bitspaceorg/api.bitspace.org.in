"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirect_uri = exports.client_secret = exports.client_id = exports.client_base_url = exports.base_url = exports.production = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.production = process.env.PRODUCTION === 'true';
exports.base_url = !exports.production ? 'http://localhost:6969' : 'https://api.bitspace.org.in';
exports.client_base_url = !exports.production ? 'http://localhost:3000' : 'https://www.bitspace.org.in';
exports.client_id = process.env.GITHUB_CLIENT_ID;
exports.client_secret = process.env.GITHUB_CLIENT_SECRET;
exports.redirect_uri = `${exports.client_base_url}/github/auth/callback`;
//# sourceMappingURL=constants.js.map