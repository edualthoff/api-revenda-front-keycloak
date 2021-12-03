import { pathValues, pathPredicates } from './../../../../core/util/path-values';
import { ItensListResponse, ItensModal } from './itens.modal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class HttpItensService {

  private urlItens = 'itens';

  constructor(private httpClient: HttpClient) { }

/**
 * Adiiconar uma novo Itens
 */
  postAdicionar(itensModel: ItensModal) {
    console.log('json: ' + JSON.stringify(itensModel));
    return this.httpClient.post<ItensModal>
    (`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/${this.urlItens}`, itensModel);
  }

  delete(idItens: string) {
    //console.log("delete "+ (`${API_URL}/categorias/`+ encodeURIComponent(MarcasModals)));
    return this.httpClient.delete<ItensModal>(`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/${this.urlItens}/${idItens}`);
  }

  putAtualizar(idItens: string, itensModel: ItensModal) {
    return this.httpClient.put<ItensModal>
      (`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/${this.urlItens}/${idItens}`, itensModel);
  }

  getTodosPage(pageNumber: number = 0, pageSize: number = 10) {
    const params = { page: pageNumber.toString(), size: pageSize.toString() };
    return this.httpClient.get<ItensListResponse>
      (`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/${this.urlItens}/todos`, { params });
  }

  /**
   * Buscar itens por modelo retornando uma pagina @param ItensListResponse
   * Auto Complete - paginacao
   *
   * @param {number} [pageNumber=0]
   * @param {number} [pageSize=10]
   * @param {string} modelo
   * @returns 
   * @memberof HttpItensService
   */
  getTodosPagePorModelo(pageNumber: number = 0, pageSize: number = 10, modelo: string): Observable<ItensListResponse> {
    const params = { page: pageNumber.toString(), size: pageSize.toString(), modelo: modelo };
    return this.httpClient.get<ItensListResponse>
      (`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/${this.urlItens}/modelo`, { params })
      .pipe(
        retry(1)
      );
  }

  get(idItens: string) {
    return this.httpClient.get<ItensModal>(`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/${this.urlItens}/${idItens}`);
  }

}
