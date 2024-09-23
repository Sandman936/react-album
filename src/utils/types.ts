export type CardImage = {
    id: number;
    url: string;
    width: number;
    height: number;
}

export interface CardItem extends CardImage {
    title: string;
    body: string;
    isLiked: boolean;
}

export enum RequestStatus {
    Idle = 'Idle',
    Loading = 'Loading',
    Rejected = 'Rejected',
    Success = 'Success'
}

export type CreateFormFields = {
    title: string;
    description: string;
    url: string;
}

export type EditFormFields = {
    id: number;
    title: string;
    description: string;
    url: string;
}