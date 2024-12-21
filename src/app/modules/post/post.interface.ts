import { Model } from "mongoose";

export type TPost = {
    name: string,
    userName: string,
    email: string,
    date: string,
    time: string,
    text: string,
    imgUrl: string,
    profileImage: string,
    isDeleted: boolean,
}

export type PostModel = Model<TPost>;