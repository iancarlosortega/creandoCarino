import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import productos from '../../../assets/data/productos.json';
import { Producto } from '../../interfaces/productos.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.component.html',
  styleUrls: ['./ver-mas.component.css']
})
export class VerMasComponent implements OnInit {

  productos: Producto[] = productos;
  productosRelacionados: Producto[] = productos;
  producto!: Producto;
  id!: number;

  constructor( private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( ({id}) => {
      this.productos = this.productos.filter(producto => producto.id == id);
      this.producto = this.productos[0];
      })
  }

}

