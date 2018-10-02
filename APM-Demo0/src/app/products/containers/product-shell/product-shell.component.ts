import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Product } from '../../product';
import * as fromProduct from '../../state';
import * as productActions from '../../state/product.actions';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class ProductShellComponent implements OnInit {

    errorMessage$: Observable<string>;
    displayCode$: Observable<boolean>;
    products$: Observable<Product[]>;
    selectedProduct$: Observable<Product>;
  
    constructor(private store: Store<fromProduct.State>) { }
  
    ngOnInit(): void {
      this.store.dispatch(new productActions.LoadProducts());
  
      this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
      this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
      this.products$ = this.store.pipe(select(fromProduct.getProducts));
      this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    }
  
    checkChanged(value: boolean): void {
      this.store.dispatch(new productActions.ToggleProductCode(value));
    }
  
    newProduct(): void {
      this.store.dispatch(new productActions.InitializeCurrentProduct());
    }
  
    productSelected(product: Product): void {
      this.store.dispatch(new productActions.SetCurrentProduct(product));
    }

    deleteProduct(id: number): void {
        this.store.dispatch(new productActions.DeleteProduct(id))
    }

    resetDetail(): void{
        this.store.dispatch(new productActions.ClearCurrentProduct);
    }
    
    saveProduct(product: Product): void {
        if (product.id === 0) {
            this.store.dispatch(new productActions.AddProduct(product));
        } else {
            this.store.dispatch(new productActions.UpdateProduct(product));
        }
    }
    
}
