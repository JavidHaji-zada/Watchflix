export class WatchStatus {
    username: string
    product_id: string
    w_date: Date
    watch_count: number

    constructor(details?: any) {
        this.username = details.username;
        this.product_id =  details.product_id;
        this.w_date =  details.w_date;
        this.watch_count =  details.watch_count;
    }
}