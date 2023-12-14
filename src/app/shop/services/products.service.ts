import { Injectable, inject } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import {
	Storage,
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from '@angular/fire/storage';
import {
	Firestore,
	addDoc,
	collection,
	collectionData,
	collectionGroup,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
} from '@angular/fire/firestore';
import { Product } from '../interfaces/product.interface';

@Injectable({
	providedIn: 'root',
})
export class ProductsService {
	// Folder path in Firebase Storage
	private basePath = '/products';
	private collectionName = 'products';

	private firestore = inject(Firestore);
	private storage = inject(Storage);

	getAllProducts() {
		const productsCollection = collectionGroup(
			this.firestore,
			this.collectionName
		);
		return collectionData(productsCollection, {
			idField: 'id',
		}) as Observable<Product[]>;
	}

	getProductsByCategory(categoryId: string) {
		const productsCollection = collection(
			this.firestore,
			`/categories/${categoryId}/${this.collectionName}`
		);
		return collectionData(productsCollection, {
			idField: 'id',
		}) as Observable<Product[]>;
	}

	getProductById(id: string, category: string) {
		return from(
			getDoc(
				doc(
					this.firestore,
					`/categories/${category}/${this.collectionName}`,
					id
				)
			)
		).pipe(map(snapshot => snapshot.data() as Product));
	}

	addProduct(product: Product, file: File) {
		const filePath = `${this.basePath}/${file.name}`;
		const storageRef = ref(this.storage, filePath);
		const uploadTask = uploadBytesResumable(storageRef, file);

		return new Observable<number>(observer => {
			uploadTask.on(
				'state_changed',
				snapshot => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					observer.next(progress);
				},
				error => {
					observer.error(error);
					console.error(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
						product.photo_url = downloadURL;
						product.photo_filename = file.name;
						this._addProductToDatabase(product);
						observer.complete();
					});
				}
			);
		});
	}

	_addProductToDatabase(product: Product) {
		const productsCollection = collection(
			this.firestore,
			`/categories/${product.category}/${this.collectionName}`
		);
		return addDoc(productsCollection, product);
	}

	updateProduct(product: Product, file: File) {
		const filePath = `${this.basePath}/${file.name}`;
		const storageRef = ref(this.storage, filePath);
		const uploadTask = uploadBytesResumable(storageRef, file);

		return new Observable<number>(observer => {
			uploadTask.on(
				'state_changed',
				snapshot => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					observer.next(progress);
				},
				error => {
					observer.error(error);
					console.error(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
						product.photo_url = downloadURL;
						product.photo_filename = file.name;
						this._updateProductToDatabase(product);
						observer.complete();
					});
				}
			);
		});
	}

	_updateProductToDatabase(product: Product) {
		const docRef = doc(
			this.firestore,
			`categories/${product.category}/products`,
			product.id!
		);
		return updateDoc(docRef, { ...product });
	}

	async removeProduct(product: Product) {
		return this.removeProductFromDatabase(product)
			.then(() => {
				this.removeProductImage(product.photo_filename!);
			})
			.catch(error => console.log(error));
	}

	removeProductFromDatabase(product: Product) {
		const docRef = doc(
			this.firestore,
			`categories/${product.category}/products`,
			product.id!
		);
		return deleteDoc(docRef);
	}

	removeProductImage(fileName: string) {
		const storageRef = ref(this.storage, `${this.basePath}/${fileName}`);
		return deleteObject(storageRef);
	}
}
