import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map } from 'rxjs/operators';
import { FileUpload } from '../admin/models/file-upload-model';
import { Producto } from './../interfaces/productos.interface';
import { Categoria } from '../interfaces/categorias.interface';

@Injectable({
	providedIn: 'root',
})
export class AdminService {
	// Nombre de la carpeta donde se guardaran en el storage de firebase
	private basePathProductos = '/products';

	constructor(
		private firestore: AngularFirestore,
		private storage: AngularFireStorage
	) {}

	// Categoría

	obtenerCategorias() {
		const categoriasCollection = this.firestore.collection('categories');

		return categoriasCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data() as Categoria;
					data.id = a.payload.doc.id;
					return data;
				});
			})
		);
	}

	obtenerCategoriaPorId(id: string) {
		const carrera = this.firestore.collection('categories').doc(id);
		return carrera.snapshotChanges().pipe(
			map(a => {
				const data = a.payload.data() as Categoria;
				data.id = a.payload.id;
				return data;
			})
		);
	}

	agregarCategoria(categoria: Categoria) {
		return this.firestore.collection('categories').add(categoria);
	}

	actualizarCategoria(categoria: Categoria) {
		return this.firestore
			.collection('categories')
			.doc(categoria.id!)
			.update(categoria);
	}

	eliminarCategoria(id: string) {
		return this.firestore.collection('categories').doc(id).delete();
	}

	//Productos

	obtenerProductos() {
		const productsCollection = this.firestore.collectionGroup('products');

		return productsCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data() as Producto;
					data.id = a.payload.doc.id;
					return data;
				});
			})
		);
	}

	obtenerProductosPorCategoria(id: string) {
		const productsCollection = this.firestore.collection(
			`/categories/${id}/products`
		);

		return productsCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data() as Producto;
					data.id = a.payload.doc.id;
					return data;
				});
			})
		);
	}

	obtenerProductoPorId(id: string, categoria: string) {
		const productsCollection = this.firestore.doc(
			`/categories/${categoria}/products/${id}`
		);
		return productsCollection.snapshotChanges().pipe(
			map(a => {
				const data = a.payload.data() as Producto;
				data.id = a.payload.id;
				return data;
			})
		);
	}

	agregarProducto(fileUpload: FileUpload, producto: Producto) {
		const filePath = `${this.basePathProductos}/${fileUpload.file.name}`;
		const storageRef = this.storage.ref(filePath);
		const uploadTask = this.storage.upload(filePath, fileUpload.file);

		//Esperar a obtener el link de descarga del archivo subido
		uploadTask
			.snapshotChanges()
			.pipe(
				finalize(() => {
					storageRef.getDownloadURL().subscribe(downloadURL => {
						producto.photo_url = downloadURL;
						this._agregarProducto(producto);
					});
				})
			)
			.subscribe();

		return uploadTask.percentageChanges();
	}

	_agregarProducto(producto: Producto) {
		return this.firestore
			.collection(`categories/${producto.category}/products`)
			.add(producto);
	}

	actualizarProductoCompleto(fileUpload: FileUpload, producto: Producto) {
		const filePath = `${this.basePathProductos}/${fileUpload.file.name}`;
		const storageRef = this.storage.ref(filePath);
		const uploadTask = this.storage.upload(filePath, fileUpload.file);

		//Esperar a obtener el link de descarga del archivo subido
		uploadTask
			.snapshotChanges()
			.pipe(
				finalize(() => {
					storageRef.getDownloadURL().subscribe(downloadURL => {
						producto.photo_url = downloadURL;
						this.actualizarProducto(producto);
					});
				})
			)
			.subscribe();

		return uploadTask.percentageChanges();
	}

	actualizarProducto(producto: Producto) {
		return this.firestore
			.collection(`categories/${producto.category}/products`)
			.doc(producto.id!)
			.update(producto);
	}

	eliminarProducto(producto: Producto) {
		return this.eliminarProductoFirestore(producto)
			.then(() => {
				this.eliminarProductoStorage(producto.photo_filename!);
			})
			.catch(error => console.log(error));
	}

	eliminarProductoFirestore(producto: Producto): Promise<void> {
		return this.firestore
			.collection(`categories/${producto.category}/products`)
			.doc(producto.id)
			.delete();
	}

	eliminarProductoStorage(name: string) {
		this.storage.ref(this.basePathProductos).child(name).delete();
	}
}
