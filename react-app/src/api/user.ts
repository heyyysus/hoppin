import { useReducer } from "react";
import { api } from "./api"
import { IUser } from "./models/IUser";

export const getLocalUser = async (token: string): Promise<IUser | null> => {
    try{
        const { get } = api(token);
        const response = await get('user')
        if(response.ok){
            const body = await response.json();
            return body;
        } else {
            return null;
        }
    }catch(e){
        console.log(e);
        return null;
    }
}

export const getUserById = async (id: string, token: string): Promise<IUser | null> => {
    try{
        const { get } = api(token);
        const response = await get(`user?user_id=${id}`)
        if(response.ok){
            const body = await response.json();
            return body;
        } else {
            return null;
        }
    }catch(e){
        console.log(e);
        return null;
    }
}

export const getUserByUsername = async (username: string, token: string): Promise<IUser | null> => {
    try{
        const { get } = api(token);
        const response = await get(`user?username=${username}`)
        if(response.ok){
            const body = await response.json();
            return body;
        } else {
            return null;
        }
    }catch(e){
        console.log(e);
        return null;
    }
}

export const patchUser = async (user: IUser, token: string): Promise<IUser | null> => {
    try {
        const { patch } = api(token);
        const response = await patch('user', user);
        if(response.ok){
            return response.json()
        }
        else {
            console.log(response.statusText)
            return null
        }
    } catch(e){
        console.log(e);
        return null;
    }
}