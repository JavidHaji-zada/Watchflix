export class WatchStatus {
    username: string
    m_id: string
    watch_date: Date
    watch_count: number

    constructor(details?: any) {
        this.username = details.username;
        this.m_id =  details.m_id;
        this.watch_date =  details.watch_date;
        this.watch_count =  details.watch_count;
    }
}