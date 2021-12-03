import { pathValues, pathPredicates } from './../../../../core/util/path-values';
import { MarcasModal, MarcasListResponse } from './marcas.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpMarcasService {

  private urlMarcas = 'marcas';

  constructor(private http: HttpClient) { }

  /**
   * Adiiconar uma nova Marca
   */
  post(marcasModel: MarcasModal) {
    return this.http.post<MarcasModal>(`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/${this.urlMarcas}`, marcasModel);
  }

  delete(idMarcas: number) {
    //console.log("delete "+ (`${API_URL}/categorias/`+ encodeURIComponent(MarcasModals)));
    return this.http.delete<MarcasModal>(`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/${this.urlMarcas}/${idMarcas}`);
  }

  put(idMarcas: number, marcasModel: MarcasModal){
    return this.http.put<MarcasModal>(`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/${this.urlMarcas}/${idMarcas}`, marcasModel);
  }
  getTodosPage(pageNumber: number = 0, pageSize: number = 10) {
    const params = { page: pageNumber.toString(), size: pageSize.toString() };
    return this.http.get<MarcasListResponse>(`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/${this.urlMarcas}/todos`, { params });
  }

  get(idMarcas: number) {
    console.log("service marca: ", idMarcas)
    return this.http.get<MarcasModal>(`${pathValues.REVENDA_API}/${pathPredicates.MERCADO_LIVRE}/${this.urlMarcas}/${idMarcas}`);
  }
}
