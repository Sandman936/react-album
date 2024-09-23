import { CardImage, CardItem } from "./types";

export const createArrayFromData = (dataArray: Partial<CardItem>[], imagesArray: CardImage[]): CardItem[] => {
    const newArray: CardItem[]  = [];

    for (let i = 0; i < dataArray.length; i++) {
        if (imagesArray[i]) {
            newArray.push({
                id: imagesArray[i].id || 0,
                url: imagesArray[i].url || '',
                title: dataArray[i].title || 'Безназвания',
                body: dataArray[i].body || 'Описание отсутствует',
                isLiked: false,
                width: imagesArray[i].width,
                height: imagesArray[i].height,
            });
        };
    };

    return newArray;
}