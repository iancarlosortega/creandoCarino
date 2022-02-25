import { Component, OnInit } from '@angular/core';
import productos from '../../../assets/data/productos.json';
import { Producto } from '../../interfaces/productos.interface';

@Component({
  selector: 'app-desayunos',
  templateUrl: './desayunos.component.html',
  styleUrls: ['./desayunos.component.css']
})
export class DesayunosComponent implements OnInit {

  productos: Producto[] = productos;

  constructor() { }

  ngOnInit(): void {
    this.productos = this.productos.filter(producto => producto.categoria === "desayunos");
  }

}