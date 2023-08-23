"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirect_uri = exports.client_secret = exports.client_id = exports.client_base_url = exports.client_production = exports.base_url = exports.production = void 0;
exports.production = false;
exports.base_url = !exports.production ? 'http://localhost:6969' : 'https://api.bitspace.org.in';
exports.client_production = true;
exports.client_base_url = !exports.client_production ? 'http://localhost:3000' : 'https://bitspace.org.in';
exports.client_id = "e49d77123e22ded7e2e0";
exports.client_secret = "ccb7b74a08150afc8a0a834cef39fb76b9e6f441";
exports.redirect_uri = `${exports.client_base_url}/github/auth/callback`;
//# sourceMappingURL=constants.js.map