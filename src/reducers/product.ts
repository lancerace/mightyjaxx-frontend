import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IProduct {
    sku: string;
    title:string;
    imageUrl :string;
}
interface IProductReducer {
    //status: 'idle' | 'loading' | 'succeeded' | 'failed',
    products: any[];
}

const initialState: IProductReducer = {
    products: []
};



/*action creator: post/fetchProducts
possible thunk async state: pending | fulfilled | rejected
*/
export const fetchProducts: any = createAsyncThunk('posts/fetchProducts', async () => {
    const { data } =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
    return data.products;
})

//first parameter = redux state object
export const selectAllProducts = (state: any) => state.products;

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = state.products.concat(action.payload);
        })
    }
})

export default productSlice.reducer;