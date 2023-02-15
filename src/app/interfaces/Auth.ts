import { User } from "./User";

export interface Auth {
    correo: string;
    password: string;
}

export interface ResAuth {
    message: string;
    access_token: string;
    usuario: User,
    rol: Rol
}
export interface Rol{
    id: number;
    nombre: string;
}