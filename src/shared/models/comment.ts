export class Comment {
    username: string
    comment_id: string
    replied_to: string
    comment_date: Date
    c_content: string
    mediaProduct: string

    constructor(details?: any) {
        this.username = details.username;
        this.comment_id =  details.c_id;
        this.replied_to =  details.r_id;
        this.comment_date =  details.date;
        this.c_content =  details.content;
        this.mediaProduct = details.mid;
    }
}