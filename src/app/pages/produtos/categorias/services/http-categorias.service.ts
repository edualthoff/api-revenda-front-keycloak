import { pathValues, pathPredicates } from './../../../../core/util/path-values';
import { Observable } from 'rxjs';
import { CategoriasListResponse, CategoriasModal } from './categorias.modal';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCategoriasService {

  constructor(private http: HttpClient) { }

  /**
   * Adiiconar uma nova Categoria
   */
  post(categorias: CategoriasModal) {
    return this.http.post<CategoriasModal>(`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/categorias`, categorias);
  }

  delete(idCategoria: number) {
    //console.log("delete "+ (`${API_URL}/categorias/`+ encodeURIComponent(idCategoria)));
    return this.http.delete<CategoriasModal>(`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/categorias/${idCategoria}`);
  }

  put(idCategoria: number, categorias: CategoriasModal){
    return this.http.put<CategoriasModal>(`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/categorias/${idCategoria}`, categorias);
  }
  getTodosPage(pageNumber: number = 0, pageSize: number = 10) {
    const params = { page: pageNumber.toString(), size: pageSize.toString() };
    return this.http.get<CategoriasListResponse>(`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/categorias/todos`, { params });
  }
  /**
   * Retorna uma categoria
   *
   * @param {string} idCategoira
   * @returns
   * @memberof HttpCategoriasService
   */
  get(idCategoira: number): Observable<CategoriasModal> {
    return this.http.get<CategoriasModal>(`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/categorias/${idCategoira}`);
  }
}
