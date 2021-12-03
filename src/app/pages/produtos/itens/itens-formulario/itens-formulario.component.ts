import { ItensProduto, ItensModal } from './../services/itens.modal';
import { HttpCategoriasService } from './../../categorias/services/http-categorias.service';
import { HttpMarcasService } from './../../marcas/services/http-marcas.service';
import { HttpItensService } from './../services/http-itens.service';
import { CategoriasModal, CategoriasListResponse } from './../../categorias/services/categorias.modal';
import { MarcasModal, MarcasListResponse } from './../../marcas/services/marcas.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-itens-formulario',
  templateUrl: './itens-formulario.component.html',
  styleUrls: ['./itens-formulario.component.scss']
})
export class ItensFormularioComponent implements OnInit {

  public titulo: string = 'Adicionar';
  public itensForm: FormGroup;

  /** Select Marcas */
  marcasList: MarcasModal[] = [];
  pagMarcas = 0;
  totalPagMarca = 1;
  /** Select Categorias */
  categoriasList: CategoriasModal[] = [];
  pagCategoria = 0;
  totalPagCategoria = 1;


  constructor(private formaBuilder: FormBuilder, private httpItens: HttpItensService, private httpMarcas: HttpMarcasService,
    private httpCategorias: HttpCategoriasService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.listarSelectMarcas();
    this.listarSelectCategorias();

    if (this.activedRoute.snapshot.params['id'] !== undefined) {
      this.titulo = 'Atualizar';
      this.httpItens.get(this.activedRoute.snapshot.params['id']).subscribe(result => {
        this.itensForm.patchValue({
          idItem: result.id,
          modelo: result.modelo,
          descricao: result.descricao,
          idMarca: result.idMarca,
          idCategoria: result.idCategoria,
        });
        this.marcasList.push(result.idMarca);
        this.categoriasList.push(result.idCategoria);
        console.log("list ", JSON.stringify(result));
      });
    }

  }

  private createForm(): void {
    this.itensForm = this.formaBuilder.group({
      idItem: new FormControl({ value: '', disabled: true }),
      modelo: new FormControl('', Validators.required),
      descricao: new FormControl(''),
      idMarca: new FormControl('', Validators.required),
      idCategoria: new FormControl('', Validators.required),
    });
  }

  /**
   * Implementa uma lista de Marcas no solect
   * @memberof ItensFormularioComponent
   */
  listarSelectMarcas() {
    this.httpMarcas.getTodosPage(this.pagMarcas).subscribe((result: MarcasListResponse) => {
      this.totalPagMarca = result.totalPages;
      this.pagMarcas++;
      this.marcasList = this.marcasList.concat(result.content);
    });
  }
  /**
   * Implementa uma lista de categorias no solect
   * @memberof ItensFormularioComponent
   */
  listarSelectCategorias() {
    this.httpCategorias.getTodosPage(this.pagCategoria).subscribe((result: CategoriasListResponse) => {
      this.totalPagCategoria = result.totalPages;
      this.pagCategoria++;
      this.categoriasList = this.categoriasList.concat(result.content);
    });
  }

  buttonSalvar() {
    const itensModal = {} as ItensModal;
    itensModal.id = this.itensForm.controls.idItem.value;
    itensModal.modelo = this.itensForm.controls.modelo.value;
    itensModal.descricao = this.itensForm.controls.descricao.value;
    itensModal.idMarca = this.itensForm.controls.idMarca.value;
    itensModal.idCategoria = this.itensForm.controls.idCategoria.value;
    /* new ItensProduto(
      this.itensForm.controls.idItem.value,
      this.itensForm.controls.modelo.value,
      this.itensForm.controls.descricao.value,
      this.itensForm.controls.MarcasModal.value,
      this.itensForm.controls.idCategoria.value
    ); */
    if (this.activedRoute.snapshot.params['id'] !== undefined) {
      this.alterarItens(itensModal);
    } else {
      this.adicionarItens(itensModal);
    }
  }

  private adicionarItens(itensModal: ItensModal) {
    //console.log("button adicionar novo - adicionarItens")
    this.httpItens.postAdicionar(itensModal).subscribe(() => { this.router.navigate([`../`], { relativeTo: this.activedRoute }); });
  }

  private alterarItens(itensModal: ItensModal) {
    //console.log("button atualizar - alterarItens")
    this.httpItens.putAtualizar(this.activedRoute.snapshot.params['id'], itensModal).subscribe(
      () => { },
      () => { },
      () => { this.router.navigate([`../../`], { relativeTo: this.activedRoute }); });
  }
  buttonSair() {
    //this.router.navigate([`/produtos/itens`], { relativeTo: this.activedRoute });
    this.router.navigateByUrl(`/produtos/itens`);
  }
}
