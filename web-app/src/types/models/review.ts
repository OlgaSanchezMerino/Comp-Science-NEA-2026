import type { User } from "@/types/models/user";
import type { Film } from '@/types/models/film';

export interface Review{
    _id?: string;    
    rating: number;    
    createdAt: Date;
    film:Film;
    user:User;
    //username: string;
    //title: string;
    //genre: string;    
}
