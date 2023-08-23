export const production: boolean = false;
export const base_url = !production ? 'http://localhost:6969' : 'https://api.bitspace.org.in';

export const client_production: boolean = true;
export const client_base_url = !client_production ? 'http://localhost:3000' : 'https://bitspace.org.in';

export const client_id = "e49d77123e22ded7e2e0"
export const client_secret = "ccb7b74a08150afc8a0a834cef39fb76b9e6f441"
export const redirect_uri = `${client_base_url}/github/auth/callback`
