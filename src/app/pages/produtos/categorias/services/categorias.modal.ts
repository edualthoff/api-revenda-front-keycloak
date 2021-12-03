export interface CategoriasModal {

    id: number;
    nome: string;
    status: boolean;
}

export interface CategoriasListResponse {
    content: CategoriasModal[];
    totalElements: number;
    totalPages: number;
    size: number;
}
