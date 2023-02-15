import { Auth, Rol } from "./Auth";

export interface User{
    nombre: string;
    apellido: string;
    cedula: string;
    correo: string;
    password: string;
    rol_id?: string;
    rol: Rol
}

