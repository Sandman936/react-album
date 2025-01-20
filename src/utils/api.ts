// import { baseURL, productsCount } from "../constants/constants";
// import { CardImage, CardItem } from "./types";

import { mockCards } from "../constants/mock-data";

// const checkResponse = <T>(res: Response): Promise<T> =>
//   res.ok 
//         ? res.json() 
//         : res.json()
//             .then((err) => Promise.reject(err));

// export const getProductImagesApi = () =>
//   fetch(`${baseURL}/photos?limit=${productsCount}`)
//     // .then((res) => checkResponse<CardImage[]>(res))
//     .then((data) => {
//       Promise.resolve()
//       return Promise.reject(data);
//     });

export const getProductDataApi = () => {
  return Promise.resolve(mockCards)
};
