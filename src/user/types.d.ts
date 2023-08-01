// Types for the user module
export type Role = {
    role: string,
    username: string,
}
export type User = { 
    id: string,
    username: string,
    rank: number,
    is_ban: boolean,
    title: string,
    is_joined_discord: boolean,
    created_at: Date,
    discord_id: string,
    github_id?: string,
    strike: number,
    points?: number,
    Role_user: Array<Role>
 }
