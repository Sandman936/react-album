import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDataApi } from "../utils/api";

export const getProductData = createAsyncThunk(
    'cards',
    async () => getProductDataApi()
)