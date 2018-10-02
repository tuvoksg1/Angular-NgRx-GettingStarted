import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';

import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productService: ProductService) {

    }

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.LoadProducts), 
        mergeMap((action: productActions.LoadProducts) => this.productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadProductsSuccess(products))),
            catchError(error => of(new productActions.LoadProductsFail(error)))
        ))
    )

    @Effect()
    updateProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((subject: Product) => this.productService.updateProduct(subject).pipe(
            map((result: Product) => (new productActions.UpdateProductSuccess(result))),
            catchError(error => of(new productActions.UpdateProductFail(error)))
        ))
    )

    @Effect()
    deleteProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.DeleteProduct), 
        map((action: productActions.DeleteProduct) => action.payload),
        mergeMap((id: number) => this.productService.deleteProduct(id).pipe(
            map(() => (new productActions.DeleteProductSuccess(id))),
            catchError(error => of(new productActions.DeleteProductFail(error)))
        ))
    )

    @Effect()
    addProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.AddProduct), 
        map((action: productActions.AddProduct) => action.payload),
        mergeMap((subject: Product) => this.productService.createProduct(subject).pipe(
            map((product: Product) => (new productActions.AddProductSuccess(product))),
            catchError(error => of(new productActions.AddProductFail(error)))
        ))
    )
}