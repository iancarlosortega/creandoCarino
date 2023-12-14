import { Injectable, inject } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import {
	Firestore,
	addDoc,
	collection,
	collectionData,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
} from '@angular/fire/firestore';
import { Category } from '../interfaces/category.interface';

@Injectable({
	providedIn: 'root',
})
export class CategoriesService {
	private firestore = inject(Firestore);
	private categoryCollection = collection(this.firestore, 'categories');

	getAllCategories() {
		return collectionData(this.categoryCollection, {
			idField: 'id',
		}) as Observable<Category[]>;
	}

	getCategoryById(id: string) {
		return from(getDoc(doc(this.firestore, 'categories', id))).pipe(
			map(snapshot => snapshot.data() as Category)
		);
	}

	addCategory(category: Category) {
		return addDoc(this.categoryCollection, category);
	}

	updateCategory(category: Category) {
		const docRef = doc(this.firestore, 'categories', category.id!);
		return updateDoc(docRef, { ...category });
	}

	removeCategory(id: string) {
		const docRef = doc(this.firestore, 'categories', id);
		return deleteDoc(docRef);
	}
}
