import { type } from "os";

export type ReviewModel = {
    id : number;
    userEmail : string;
    date : string;
    rating : number;
    reviewDescription : string;
    //book_id : number;
};