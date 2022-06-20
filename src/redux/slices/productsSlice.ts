import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await axios.get<ProductsItem[]>(
      `https://629b555acf163ceb8d17dbbd.mockapi.io/cats`
    );
    return data;
  }
);

type ProductsItem = {
  id: string;
  tagline: string;
  title: string;
  subtitle: string;
  info: {
    serving: number;
    gift: number;
    cool: boolean;
  };
  weight: string;
  footnote: {
    selected: string;
  };
  presence: boolean;
};

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface ProductsSliceState {
  status: Status;
  items: ProductsItem[];
}

const initialState: ProductsSliceState = {
  items: [],
  status: Status.LOADING,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
		});
		
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
		});

		builder.addCase(fetchProducts.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
		});
  },
});

export const selectProducts = (state: RootState) => state.products.items;
export const selectProductssStatus = (state: RootState) => state.products.status;

export default productsSlice.reducer;
