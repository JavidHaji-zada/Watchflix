import { Genre } from "../models/genre";

export class MediaService {

    static getGenres(): Genre[] {
        // dummy data
        let genre1 = new Genre('genre1');
        let genre2 = new Genre('genre2');
        let genre3 = new Genre('genre3');
        let genre4 = new Genre('genre4');
        let genre5 = new Genre('genre5');
        let genre6 = new Genre('genre6');
        let genre7 = new Genre('genre7');
        let genre8 = new Genre('genre8');
        let genre9 = new Genre('genre9');
        let genre10 = new Genre('genre10');
        let genre11 = new Genre('genre11');
        let genre12 = new Genre('genre12');
        let genre13 = new Genre('genre13');
        let genres = []
        genres.push(genre1)
        genres.push(genre2)
        genres.push(genre3)
        genres.push(genre4)
        genres.push(genre5)
        genres.push(genre6)
        genres.push(genre7)
        genres.push(genre8)
        genres.push(genre9)
        genres.push(genre10)
        genres.push(genre11)
        genres.push(genre12)
        genres.push(genre13)
        return genres
    }

}