import { MediaProduct } from "./media-product"

export class Channel {
    _id: string = ''
    name: string = ''
    medias: MediaProduct[] = []

    constructor(details?: any) {
        if (details) {
            if (details.channel_id)
                this._id = details.channel_id
            if (details.c_name)
                this.name = details.c_name
            if (details.medias)
                this.medias = details.medias.map((m: any) => new MediaProduct(m))
        }
    }
}