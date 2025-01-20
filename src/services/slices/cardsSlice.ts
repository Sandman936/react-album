import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardItem, CreateFormFields, EditFormFields, RequestStatus } from "../../utils/types";
import { getProductData } from "../thunks";

interface cardsState {
    data: CardItem[];
    status: RequestStatus;
    error: string | undefined;
}

export const initialState:cardsState = {
    data: [],
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
        editCard(state: cardsState, action: PayloadAction<EditFormFields>) {
          state.data.forEach((product) => {
            if (product.id === action.payload.id) {
              product.title = action.payload.title;
              product.body = action.payload.description;
              product.url = action.payload.url;
            }
          });
        },
    },
    extraReducers(builder) {
        builder
          .addCase(getProductData.pending, (state) => {
            state.status = RequestStatus.Loading;
          })
          .addCase(getProductData.rejected, (state, action) => {
            state.status = RequestStatus.Rejected;
            state.error = action.error.message
          })
          .addCase(getProductData.fulfilled, (state, action: PayloadAction<CardItem[]>) => {
            state.status = RequestStatus.Success;
            state.data = action.payload;
          });
    },
    selectors: {
        cardsDataSelector: (state: cardsState) => state.data,
        cardsStatusSelector: (state: cardsState) => state.status
    }
});

export const {cardsDataSelector, cardsStatusSelector} = cardsSlice.selectors;
export const {deleteCard, toggleLikeOnCard, addNewCard, editCard} = cardsSlice.actions
