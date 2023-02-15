import { Book } from "./book";

export interface Lend{
    libro: Book;
    fechaPrestamo: string;
    fechaDevolucion: string;
    usuario_id: number;
    isReturn: boolean;
    isBorrewed: boolean;
}
