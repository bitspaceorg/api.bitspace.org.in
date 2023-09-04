import * as dotenv from 'dotenv';
dotenv.config();

export const production: boolean = process.env.PRODUCTION === 'true';
export const base_url = !production ? 'http://localhost:6969' : 'https://api.bitspace.org.in';
export const client_base_url = !production ? 'http://localhost:3000' : 'https://www.bitspace.org.in';

export const client_id = process.env.GITHUB_CLIENT_ID;
export const client_secret = process.env.GITHUB_CLIENT_SECERT
export const redirect_uri = `${client_base_url}/github/auth/callback`
