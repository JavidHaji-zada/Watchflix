import { MediaProduct } from "./media-product"

export class Channel {
    _id: string
    name: string
    medias: MediaProduct[]

    constructor(details?: any) {
        this._id = details._id
        this.name = details.name
        this.medias = details.medias?.map((m: any) => new MediaProduct(m))
    }
}