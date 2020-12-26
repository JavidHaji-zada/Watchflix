export class MediaProduct {
    _id: string
    score: number
    release_date: Date
    name: string
    thumbnail_url: string
    description: string

    constructor(details?: any) {
        this._id = details._id
        this.score = details.score
        this.release_date = new Date(details.release_date)
        this.name = details.name
        this.thumbnail_url = details.thumbnail_url
        this.description = details.description
    }
}