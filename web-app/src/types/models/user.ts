import type { GenreSelection } from "./genre";

export interface User{
    _id: string;    
    username: string;
    email: string;
    name: string;
    lastname: string;
    password: string;
    favGenres: GenreSelection[];
}
