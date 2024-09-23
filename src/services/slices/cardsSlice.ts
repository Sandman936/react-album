import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardImage, CardItem, CreateFormFields, RequestStatus } from "../../utils/types";
import { getProductData, getProductImages} from "../thunks";
import { createArrayFromData } from "../../utils/createArrayFromData";

interface cardsState {
    data: CardItem[];
    images: CardImage[];
    status: RequestStatus;
    error: string | undefined;
}

export const initialState:cardsState = {
    data: [],
    images: [],
    status: RequestStatus.Idle,
    error: undefined
}

export const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        deleteCard(state: cardsState, action: PayloadAction<number>) {
            state.data = state.data.filter((card) => card.id !== action.payload);
        },
        toggleLikeOnCard(state: cardsState, action: PayloadAction<number>) {
            state.data.forEach((card) => {
              if (card.id === action.payload) {
                card.isLiked = !card.isLiked
              }
            });
        },
        addNewCard(state: cardsState, action: PayloadAction<CreateFormFields>) {
          state.data.unshift({
            id: state.data.length + 1,
            url: action.payload.url || "",
            title: action.payload.title || "Безназвания",
            body: action.payload.description || "Описание отсутствует",
            isLiked: false,
            width: 0,
            height: 0,
          });
        },
    },
    extraReducers(builder) {
        builder
          .addCase(getProductImages.pending, (state) => {
            state.status = RequestStatus.Loading;
          })
          .addCase(getProductImages.rejected, (state, action) => {
            state.status = RequestStatus.Rejected;
            state.error = action.error.message
          })
          .addCase(getProductImages.fulfilled, (state, action: PayloadAction<CardImage[]>) => {
            state.status = RequestStatus.Success;
            state.images = action.payload;
          })
          .addCase(getProductData.pending, (state) => {
            state.status = RequestStatus.Loading;
          })
          .addCase(getProductData.rejected, (state, action) => {
            state.status = RequestStatus.Rejected;
            state.error = action.error.message
          })
          .addCase(getProductData.fulfilled, (state, action: PayloadAction<Partial<CardItem>[]>) => {
            state.status = RequestStatus.Success;
            state.data = createArrayFromData(action.payload, state.images);
          });
    },
    selectors: {
        cardsDataSelector: (state: cardsState) => state.data,
        cardsStatusSelector: (state: cardsState) => state.status
    }
});

export const {cardsDataSelector, cardsStatusSelector} = cardsSlice.selectors;
export const {deleteCard, toggleLikeOnCard, addNewCard} = cardsSlice.actions
