export type auth_role = 'USER' | 'ADMIN'

export interface IUser {
    user_id: number,
    email?: string,
    username: string,
    profile_img?: string,
    auth?: auth_role,
    ts?: Date,
}