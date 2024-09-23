import { baseURL } from "../constants/constants";
import { CardImage, CardItem } from "./types";

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok 
        ? res.json() 
        : res.json()
            .then((err) => Promise.reject(err));

export const getProductImagesApi = () =>
  fetch(`${baseURL}/photos?_limit=15`)
    .then((res) => checkResponse<CardImage[]>(res))
    .then((data) => {
      if (data) {
        return data;
      }
      return Promise.reject(data);
    });

export const getProductDataApi = () =>
  fetch(`${baseURL}/posts?_limit=15`)
    .then((res) => checkResponse<CardItem[]>(res))
    .then((data) => {
      if (data) {
        return data;
      }
      return Promise.reject(data);
    });
