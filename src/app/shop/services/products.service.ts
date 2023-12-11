import { Injectable, inject } from '@angular/core';
import { finalize, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Product } from '../interfaces/product.interface';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	// Folder path in Firebase Storage
	private basePath = '/products';

	private firestore = inject(AngularFirestore);
	private storage = inject(AngularFireStorage);

	getAllProducts() {
		const productsCollection = this.firestore.collectionGroup('products');
		return productsCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data() as Product;
					data.id = a.payload.doc.id;
					return data;
				});
			})
		);
	}

	getProductsByCategory(categoryId: string) {
		const productsCollection = this.firestore.collection(
			`/categories/${categoryId}/products`
		);

		return productsCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data() as Product;
					data.id = a.payload.doc.id;
					return data;
				});
			})
		);
	}

	getProductById(id: string, category: string) {
		const productsCollection = this.firestore.doc(
			`/categories/${category}/products/${id}`
		);
		return productsCollection.get().pipe(
			map(product => {
				const data = product.data() as Product;
				data.id = product.id;
				return data;
			})
		);
	}

	addProduct(product: Product, file: File) {
		const filePath = `${this.basePath}/${file.name}`;
		const storageRef = this.storage.ref(filePath);
		const uploadTask = this.storage.upload(filePath, file);

		uploadTask
			.snapshotChanges()
			.pipe(
				finalize(() => {
					storageRef.getDownloadURL().subscribe(downloadURL => {
						product.photo_url = downloadURL;
						product.photo_filename = file.name;
						this._addProductToDatabase(product);
					});
				})
			)
			.subscribe();

		return uploadTask.percentageChanges();
	}

	_addProductToDatabase(product: Product) {
		return this.firestore
			.collection(`categories/${product.category}/products`)
			.add(product);
	}

	updateProduct(product: Product, file: File) {
		const filePath = `${this.basePath}/${file.name}`;
		const storageRef = this.storage.ref(filePath);
		const uploadTask = this.storage.upload(filePath, file);

		uploadTask
			.snapshotChanges()
			.pipe(
				finalize(() => {
					storageRef.getDownloadURL().subscribe(downloadURL => {
						product.photo_url = downloadURL;
						product.photo_filename = file.name;
						this._updateProductToDatabase(product);
					});
				})
			)
			.subscribe();

		return uploadTask.percentageChanges();
	}

	_updateProductToDatabase(product: Product) {
		return this.firestore
			.collection(`categories/${product.category}/products`)
			.doc(product.id!)
			.update(product);
	}

	async removeProduct(product: Product) {
		return this.removeProductFromDatabase(product)
			.then(() => {
				this.removeProductImage(product.photo_filename!);
			})
			.catch(error => console.log(error));
	}

	removeProductFromDatabase(producto: Product): Promise<void> {
		return this.firestore
			.collection(`categories/${producto.category}/products`)
			.doc(producto.id)
			.delete();
	}

	removeProductImage(name: string) {
		this.storage.ref(this.basePath).child(name).delete();
	}
}
