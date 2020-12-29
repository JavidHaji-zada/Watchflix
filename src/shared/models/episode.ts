export class Episode {
    _id: string
    name: string
    season_number: string 
    episode_number: string
    thumbnail_url: string

    constructor(details?: any) {
        this._id = details._id
        this.name = details.name
        this.season_number = details.season_number
        this.episode_number = details.episode_number
        this.thumbnail_url = details.thumbnail_url
    }
}