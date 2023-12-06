import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Category } from '../interfaces/category.interface';

@Injectable({
	providedIn: 'root',
})
export class CategoriesService {
	private firestore = inject(AngularFirestore);

	getAllCategories() {
		const categoriesCollection = this.firestore.collection('categories');
		return categoriesCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data() as Category;
					data.id = a.payload.doc.id;
					return data;
				});
			})
		);
	}

	getCategoryById(id: string) {
		const category = this.firestore.collection('categories').doc(id);
		return category.snapshotChanges().pipe(
			map(a => {
				const data = a.payload.data() as Category;
				data.id = a.payload.id;
				return data;
			})
		);
	}

	addCategory(category: Category) {
		return this.firestore.collection('categories').add(category);
	}

	updateCategory(category: Category) {
		return this.firestore
			.collection('categories')
			.doc(category.id!)
			.update(category);
	}

	removeCategory(id: string) {
		return this.firestore.collection('categories').doc(id).delete();
	}
}
