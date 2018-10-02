import { Product } from "../product";
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductActions, ProductActionTypes } from "./product.actions";
import { ProductState } from "./product.reducer";

export interface State extends fromRoot.State{
    products: ProductState;
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

//const stateSlice = createSelector(getProductFeatureState, state => state.reducer);

export const getShowProductCode = createSelector(getProductFeatureState, 
    state => state.reducer.showProductCode);
export const getCurrentProductId = createSelector(getProductFeatureState, 
    state => state.reducer.currentProductId);
export const getCurrentProduct = createSelector(getProductFeatureState, getCurrentProductId, 
    (state, currentProductId) => {
        if(currentProductId === 0){
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 2
            };
        } else{
            return currentProductId ? state.reducer.products.find(p => p.id === currentProductId) : null}
    });
export const getProducts = createSelector(getProductFeatureState, 
    state => state.reducer.products);
export const getError = createSelector(getProductFeatureState, 
    state => state.reducer.error);