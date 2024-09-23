import { baseURL } from "../constants/constants";
import { cardImage, cardItem } from "./types";

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok 
        ? res.json() 
        : res.json()
            .then((err) => Promise.reject(err));

export const getProductImagesApi = () =>
  fetch(`${baseURL}/photos?_limit=15`)
    .then((res) => checkResponse<cardImage[]>(res))
    .then((data) => {
      if (data) {
        return data;
      }
      return Promise.reject(data);
    });

export const getProductDataApi = () =>
  fetch(`${baseURL}/posts?_limit=15`)
    .then((res) => checkResponse<cardItem[]>(res))
    .then((data) => {
      if (data) {
        return data;
      }
      return Promise.reject(data);
    });
