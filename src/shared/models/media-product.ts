export class MediaProduct {
    _id: string
    score: number
    release_date: Date
    name: string
    thumbnail_url: string = "https://img1.evosis.org/movie/629/icon/icon0.png"
    description: string
    publisher: string

    constructor(details?: any) {
        this._id = details.m_id
        this.score = details.score
        this.release_date = new Date(details.release_date)
        this.name = details.mp_name
        this.thumbnail_url = details.thumbnail_url || "https://img1.evosis.org/movie/629/icon/icon0.png"
        this.description = details.description
        this.publisher = details.publisher
    }
}