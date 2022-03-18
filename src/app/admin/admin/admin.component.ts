import { Component, TemplateRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FileUpload } from './../models/file-upload-model';
import { Producto } from './../../interfaces/productos.interface';
import { Categoria } from './../../interfaces/categorias.interface';
import { Table } from 'primeng/table';
import { MatDialog } from '@angular/material/dialog';
import { EliminarComponent } from '../eliminar/eliminar.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  @ViewChild ('dtCategorias') dtCategorias: Table | undefined;
  @ViewChild ('dtProductos') dtProductos: Table | undefined;
  @ViewChild ('modalCrearCategoria') modalCrearCategoria!: TemplateRef<any>;
  @ViewChild ('modalEditarCategoria') modalEditarCategoria!: TemplateRef<any>;
  @ViewChild ('modalCrearProducto') modalCrearProducto!: TemplateRef<any>;
  @ViewChild ('modalEditarProducto') modalEditarProducto!: TemplateRef<any>;

  categoria!      : Categoria;
  producto!       : Producto;
  productoEditar! : Producto;
  categorias      : Categoria[] = [];
  productos       : Producto[] = [];
  obs!            : Subscription;

  loading              : boolean = true;
  visible              : boolean = true;
  panelOpenState       : boolean = true;
  scrollableCategories : boolean = true;
  scrollableProducts   : boolean = true;
  disabled             : boolean = false;
  emptyMessage         : string = 'Ninguna carrera encontrada'
  modalRef?            : BsModalRef;

  //FileUpload
  currentFileUpload? : FileUpload;
  selectedFiles?     : any;
  url                : any;
  format             : string = '';
  tipo               : string = 'agregar';
  percentage         : number = 0;

  //Formularios
  formularioCategoria: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.minLength(3) ] ],
  })

  formularioProducto: FormGroup = this.fb.group({
    name        : [ '', [ Validators.required, Validators.minLength(3) ] ],
    price       : [ '', [ Validators.required, Validators.min(1) ] ],
    description : [ '', [ Validators.required, Validators.minLength(10) ] ],
    category    : [ '', [ Validators.required ] ],
    photo_url   : [ '' ],
    subtitle    : [ '' ],
  })

  constructor( private fb: FormBuilder , 
      private modalService: BsModalService,
      private adminService: AdminService,
      private authService: AuthService,
      private toastr: ToastrService,
      private observer: BreakpointObserver,
      public  dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

    this.modalService.onHidden.subscribe( (_)=> {
      this.formularioCategoria.reset();
      this.formularioProducto.reset();
      this.url = null;
    })

    this.adminService.obtenerCategorias().subscribe( categorias => {
      this.categorias = categorias;
    });

    this.adminService.obtenerProductos().subscribe( productos => {
      this.productos = productos;
      this.loading = false;
    })

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(min-width: 540px)']).subscribe((res) => {
        if (res.matches) {
          this.scrollableCategories = false;
        } else {
          this.scrollableCategories = true;
        }
      });
    }, 0)

    setTimeout(() => {
      this.observer.observe(['(min-width: 992px)']).subscribe((res) => {
        if (res.matches) {
          this.scrollableProducts = false;
        } else {
          this.scrollableProducts = true;
        }
      });
    }, 0)
  }

  campoNoValidoCategoria( campo: string) {
    return this.formularioCategoria.get(campo)?.invalid && this.formularioCategoria.get(campo)?.touched;
  }

  campoNoValidoProducto( campo: string) {
    return this.formularioProducto.get(campo)?.invalid && this.formularioProducto.get(campo)?.touched;
  }

  filtrarCategorias($event: any, stringVal: string) {
    this.dtCategorias!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  filtrarProductos($event: any, stringVal: string) {
    this.dtProductos!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  logout() {
    this.authService.logout()
      .then( res => {
        console.log(res);
      })
      .catch( err => {
        this.toastr.error(err, 'Error')
      })
  }

  //Categorias

  openModalCategoria() {
    this.modalRef = this.modalService.show(this.modalCrearCategoria);
  }

  openModalEditarCategoria() {
    this.modalRef = this.modalService.show(this.modalEditarCategoria);
  }

  closeModalCategoria() {
    this.modalRef?.hide();
    this.formularioCategoria.reset();
  }  

  agregarCategoria() {

    if( this.formularioCategoria.invalid ) {
      this.formularioCategoria.markAllAsTouched();
      return;
    }

    const { id, ...categoria } = this.formularioCategoria.value;
    this.categoria = categoria;
    this.disabled = true;

    this.adminService.agregarCategoria(this.categoria)
      .then( res => {
        this.modalRef?.hide();
        this.disabled = false;
        this.formularioCategoria.reset();
        this.toastr.success(`La categoría ${this.categoria.name} fue registrada con éxito!`, 'Categoría Registrada');
      })
      .catch( err => {
        this.toastr.error(`${err}`, 'Error al agregar la categoría');
        console.log('Error al agregar la categoría', err);
      })

  }

  obtenerCategoria(id: string) {
    this.openModalEditarCategoria();
    this.adminService.obtenerCategoriaPorId(id).subscribe( (data: any) => {
      if( data.type != 'removed' ) {
        this.categoria = data;
        this.formularioCategoria.setValue({
          name: data.name,
        });
      }
      
    })
  }

  actualizarCategoria() {

    if( this.formularioCategoria.invalid ) {
      this.formularioCategoria.markAllAsTouched();
      return;
    }

    this.categoria = {...this.categoria, ...this.formularioCategoria.value};
    this.disabled = true;

    this.adminService.actualizarCategoria( this.categoria )
      .then( res => {
        this.modalRef?.hide();
        this.disabled = false;
        this.formularioCategoria.reset();
        this.toastr.info(`La categoría ${this.categoria.name} fue actualizada con éxito`, 'Categoría actualizada!');
      })
      .catch( err => {
        this.toastr.error(`${err}`, 'Error al actualizar la categoría');
        console.log('Error al actualizar la categoría', err);
      })
  }

  eliminarCategoria( id: string ) {
    //Ventana modal para confirmar la eliminacion
    const dialog = this.dialog.open(EliminarComponent, {
      width: '400px'
    });

    dialog.afterClosed().subscribe( (result: boolean) => {
        if(result) {
          this.adminService.eliminarCategoria(id)
          .then( res => {
            console.log(res);
            this.toastr.success('La categoría fue eliminada con éxito', 'Categoria eliminada!');
          })
          .catch( err => {
            this.toastr.error(`${err}`, 'Error al eliminar la categoría');
            console.log('Error al eliminar la categoría', err);
          })
        }
      }
    )

    
  }

  //Productos

  openModalProducto() {
    this.modalRef = this.modalService.show(this.modalCrearProducto);
  }

  openModalEditarProducto() {
    this.modalRef = this.modalService.show(this.modalEditarProducto);
  }

  closeModalProducto() {
    this.modalRef?.hide();
    this.formularioProducto.reset();
  }

  selectFile(event: any): void {

    const file = event.target.files && event.target.files[0];

    //Previsualizacion de la imagen
    if( file ) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      if(file.type.indexOf('image')> -1){
        this.selectedFiles = event.target.files;
        this.format = 'image';
        reader.onload = (event) => {
          this.url = (<FileReader>event.target).result;
        }
      } else {
        this.selectedFiles = null;
        this.url = null;
        this.toastr.error('Por favor, solo subir archivos de formato imagen', 'Error')
      }
      
    } else {
      this.url = null;
      this.selectedFiles = null;
    }
  }

  agregarProducto() {

    if( this.formularioProducto.invalid ) {
      this.formularioProducto.markAllAsTouched();
      return;
    }

    this.producto = this.formularioProducto.value;

    if (this.selectedFiles) {
      let filename: string = this.formularioProducto.controls['photo_url'].value;
      filename = filename.split('\\').slice(-1)[0];
      this.producto.photo_filename = filename;
      delete this.producto.file;

      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.visible = true;
        this.disabled = true;
        this.disableForm();
        this.currentFileUpload = new FileUpload(file);
        this.adminService.agregarProducto(this.currentFileUpload, this.producto).subscribe( percentage => {
          this.percentage = Math.round(percentage ? percentage : 0);
          if( this.percentage == 100 ){
            setTimeout(() => {
              this.toastr.success(`El producto ${this.producto.name} fue registrado con éxito!`, 'Producto Registrado');
              this.enableForm();
              this.formularioProducto.reset();
              this.url = null;
              this.visible = false;
              this.percentage = 0;
              this.disabled = false
            }, 500);
          }
        });
      } else {
        this.toastr.error('Error', 'Error')
      }

    } else {
      this.toastr.error('Por favor, seleccione una imagen para subir', 'Error')
    }

  }

  actualizarProducto() {

    if( this.formularioProducto.invalid ) {
      this.formularioProducto.markAllAsTouched();
      return;
    }

    delete this.formularioProducto.value.photo_url;
    this.producto = {...this.producto, ...this.formularioProducto.value };

    if (this.selectedFiles) {

      this.adminService.eliminarProductoStorage(this.producto.photo_filename!)
      
      let filename: string = this.formularioProducto.controls['photo_url'].value;
      filename = filename.split('\\').slice(-1)[0];
      this.producto.photo_filename = filename;
      delete this.producto.file;
      
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.disabled = true;
        this.disableForm();
        this.currentFileUpload = new FileUpload(file);

        // Verificar si es de la misma o distinta categoria
        if( this.productoEditar.category === this.formularioProducto.get('category')?.value ) {
          this.adminService.actualizarProductoCompleto(this.currentFileUpload, this.producto).subscribe( percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            if( this.percentage == 100 ){
              setTimeout(() => {
                this.toastr.info(`El producto ${this.producto.name} fue actualizado con éxito!`, 'Producto Actualizado');
                this.enableForm();
                this.url = null;
                this.visible = false;
                this.percentage = 0;
                this.disabled = false;
                this.closeModalProducto();
              }, 500);
            }
          });
        } else {
          this.obs.unsubscribe();
          this.adminService.eliminarProductoFirestore(this.productoEditar);
          this.adminService.agregarProducto(this.currentFileUpload, this.producto).subscribe( percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            if( this.percentage == 100 ){
              setTimeout(() => {
                this.toastr.info(`El producto ${this.producto.name} fue actualizado con éxito!`, 'Producto Actualizado');
                this.enableForm();
                this.url = null;
                this.visible = false;
                this.percentage = 0;
                this.disabled = false;
                this.closeModalProducto();
              }, 500);
            }
          });
        }
      } else {
        this.toastr.error('Error', 'Error')
      }

    } else {

      if( this.productoEditar.category === this.formularioProducto.get('category')?.value ) {

          this.adminService.actualizarProducto(this.producto)
          .then( ( _ ) => {
            this.closeModalProducto();
            this.toastr.info(`El producto ${this.producto.name} fue actualizado con éxito!`, 'Producto Actualizado')
          })
          .catch( err => {
            console.log(err);
            this.toastr.error(`err`, 'Error');
        })

      } else {
        this.obs.unsubscribe();
        this.adminService.eliminarProductoFirestore(this.productoEditar);
        this.adminService._agregarProducto(this.producto)
          .then( ( _ ) => {
            this.closeModalProducto();
            this.toastr.info(`El producto ${this.producto.name} fue actualizado con éxito!`, 'Producto Actualizado')
          })
          .catch( err => {
            console.log(err);
            this.toastr.error(`err`, 'Error');
        })
      } 
    }
  }

  obtenerProducto(id: string, categoria: string) {
    this.openModalEditarProducto();
    this.obs = this.adminService.obtenerProductoPorId(id, categoria).subscribe( (data: Producto) => {
      this.producto = data;
      this.productoEditar = data;
      this.url = data.photo_url;
      this.format = 'image';
      this.formularioProducto.setValue({
        name        : data.name,
        price       : data.price,
        description : data.description,
        subtitle    : data.subtitle || '',
        category    : data.category,
        photo_url   : ''
      });      
    })
  }

  eliminarProducto( producto: Producto ) {
    //Ventana modal para confirmar la eliminacion
    const dialog = this.dialog.open(EliminarComponent, {
      width: '400px'
    });

    dialog.afterClosed().subscribe( (result) => {
        if(result) {
          this.adminService.eliminarProducto(producto)
          .then( res => {
            this.toastr.success(`El producto fue eliminado con éxito!`, 'Producto eliminado!');
          })
          .catch( err => {
            this.toastr.error(`${err}`, 'Error al eliminar la carrerar');
            console.log('Error al eliminar la carrera', err);
          })
        }
      }
    )

    
  }

  enableForm(): void {
    this.formularioProducto.controls['name'].enable();
    this.formularioProducto.controls['price'].enable();
    this.formularioProducto.controls['description'].enable();
    this.formularioProducto.controls['subtitle'].enable();
    this.formularioProducto.controls['photo_url'].enable();
    this.formularioProducto.controls['category'].enable();
  }

  disableForm(): void {
    this.formularioProducto.controls['name'].disable();
    this.formularioProducto.controls['price'].disable();
    this.formularioProducto.controls['description'].disable();
    this.formularioProducto.controls['subtitle'].disable();
    this.formularioProducto.controls['photo_url'].disable();
    this.formularioProducto.controls['category'].disable();
  }

}
