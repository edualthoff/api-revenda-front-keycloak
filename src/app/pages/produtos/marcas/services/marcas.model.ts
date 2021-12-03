export interface MarcasModal {

    id: number;
    nome: string;
}

export interface MarcasListResponse {
    content: MarcasModal[];
    totalElements: number;
    totalPages: number;
    size: number;
}

