import { ItensModal } from './../../../produtos/itens/services/itens.modal';
import { PaginationResponse } from './../../../../core/modals/pagination-implements.modal';
import { BaseImplements } from './../../../../core/modals/base-implements.modal';

export interface LinksModal extends BaseImplements {
    linkUrl: string;
    descricao: string;
    condicao: Condicao;
    rangeInicial: number;
    rangeFinal: number;
    status: boolean;
    idProduto: ItensModal;
    hours: number;
    minutes: number;
    nextDate: Date;
}

export enum Condicao {
    usado,
    novo,
    recondicionado
}

export interface SchedulingTime {
    hours: number;
    minutes: number;
    meridiem: 'AM' | 'PM' | '';
    nextDate: Date;
}

export interface LinksMlListResponse extends PaginationResponse {
    content: LinksModal[];
}
