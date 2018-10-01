import { Product } from "../product";
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductActions, ProductActionTypes } from "./product.actions";

export interface State extends fromRoot.State{
    products: ProductState;
}

export interface ProductState{
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
    error: string
}

const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: [],
    error: ''
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

//const stateSlice = createSelector(getProductFeatureState, state => state.reducer);

export const getShowProductCode = createSelector(getProductFeatureState, 
    state => {
        return state.reducer.showProductCode});
export const getCurrentProduct = createSelector(getProductFeatureState, 
    state => state.reducer.currentProduct);
export const getProducts = createSelector(getProductFeatureState, 
    state => state.reducer.products);
export const getError = createSelector(getProductFeatureState, 
    state => state.reducer.error);

export function reducer(state = initialState, action: ProductActions): ProductState{
    switch(action.type){
        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: action.payload
            };

        case ProductActionTypes.SetCurrentProduct:
            return{
                ...state,
                currentProduct: {...action.payload}
            };

        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProduct: {
                    id: 0,
                    productName: '',
                    productCode: 'New',
                    description: '',
                    starRating: 1
                }
            };
        

        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProduct: null
            };

        case ProductActionTypes.LoadProductsSuccess:
            return{
                ...state,
                products: action.payload,
                error: ''
            };

        case ProductActionTypes.LoadProductsFail:
            return{
                ...state,
                products: [],
                error: action.payload
            }
            
        default: 
            return state;
    }
}