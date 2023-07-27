export const production: boolean = false;
export const base_url = !production ? 'http://localhost:8080' : 'https://api.bitspace.org.in';

export const client_production: boolean = false;
export const client_base_url = !client_production ? 'http://localhost:3000' : 'https://bitspace.org.in';

export const client_id = "e49d77123e22ded7e2e0"
export const client_secret = "d7c5fb2f12dfc5e3c504626e1c3b8db3af005ae6"
export const redirect_uri = `${client_base_url}/github/auth/callback`
