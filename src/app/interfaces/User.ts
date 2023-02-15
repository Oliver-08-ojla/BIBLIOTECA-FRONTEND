import { Auth } from "./Auth";

export interface User{
    nombre: string;
    apellido: string;
    cedula: string;
    auth: Auth;
    rol_id?: string;
}