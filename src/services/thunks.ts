import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDataApi, getProductImagesApi} from "../utils/api";

export const getProductImages = createAsyncThunk(
    'cards/images',
    async () => getProductImagesApi()
)

export const getProductData = createAsyncThunk(
    'cards/text',
    async () => getProductDataApi()
)