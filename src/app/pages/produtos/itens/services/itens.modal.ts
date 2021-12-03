import { map } from 'rxjs/operators';
import { MarcasModal } from './../../marcas/services/marcas.model';
import { CategoriasModal } from './../../categorias/services/categorias.modal';
import { HttpCategoriasService } from './../../categorias/services/http-categorias.service';
import { AppInjector } from './../../../../core/services/app-injector.service';
import { HttpMarcasService } from './../../marcas/services/http-marcas.service';
import { Observable } from 'rxjs';

export interface ItensModal {
    id: string;
    modelo: string;
    descricao: string;
    idCategoria: CategoriasModal;
    idMarca: MarcasModal;
}


export interface ItensListResponse {
    content: ItensModal[];
    totalElements: number;
    totalPages: number;
    size: number;
}

export class ItensProduto implements ItensModal {
    id: string;
    modelo: string;
    descricao: string;
    idCategoria: CategoriasModal;
    idMarca: MarcasModal;

    marcasModal: MarcasModal = {} as MarcasModal;
    categoriasModal: CategoriasModal = {} as CategoriasModal;

    private httpMarca: HttpMarcasService;
    private httpCategoria: HttpCategoriasService;
    private injector = AppInjector.getInjector();

    constructor(id: string, modelo: string, descricao: string, idCategoria: CategoriasModal, idMarca: MarcasModal) {
        this.id = id;
        this.modelo = modelo;
        this.descricao = descricao;
        this.idCategoria = idCategoria;
        this.idMarca = idMarca;
        this.httpMarca = this.injector.get(HttpMarcasService);
        this.httpCategoria = this.injector.get(HttpCategoriasService);
    }

    getCategorias(): Observable<CategoriasModal> {
        return this.httpCategoria.get(this.idCategoria.id).pipe(
            map((result: CategoriasModal) => {
                return this.categoriasModal = result;
                //console.log("teste getCat ", result.nome);
            })
        );
    }

    getCategoriasModal() {
        this.httpCategoria.get(this.idCategoria.id).subscribe(( result: CategoriasModal) => {
            this.categoriasModal = result;
        });
    }

    getMarcasModal() {
        //console.log("chegou aq ", this.MarcasModal)
        this.httpMarca.get(this.idMarca.id).subscribe((result: MarcasModal) => {
            this.marcasModal = result;
            //console.log("teste getMarc ", result.nome);
        });
    }
}
