export class MediaProduct {
    _id: string = ''
    score: number = 4
    release_date: Date = new Date()
    name: string = ''
    thumbnail_url: string = "https://img1.evosis.org/movie/629/icon/icon0.png"
    description: string = ''
    publisher: string = ''

    constructor(details?: any) {
        if (details) {
            this._id = details.m_id
            this.score = details.score || Math.random() * 5
            this.release_date = new Date(details.release_date)
            this.name = details.mp_name
            this.thumbnail_url = details.thumbnail_url || "https://img1.evosis.org/movie/629/icon/icon0.png"
            this.description = details.description || 'dummy desc'
            this.publisher = details.publisher
        }
    }
}