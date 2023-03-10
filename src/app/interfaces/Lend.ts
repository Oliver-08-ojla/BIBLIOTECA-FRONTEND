import { Book } from "./book";
import { User } from "./User";

export interface Lend{
    id:number;
    libro: Book;
    fechaPrestamo: string;
    fechaDevolucion: string;
    usuario_id: number;
    isReturn: boolean;
    isBorrewed: boolean;
    usuario: User
}
