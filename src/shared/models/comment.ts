export class Comment {
    username: string
    comment_id: string
    replied_to: string
    comment_date: Date
    c_content: string
    mediaProduct: string

    constructor(details?: any) {
        this.username = details.username;
        this.comment_id =  details.comment_id;
        this.replied_to =  details.reply_to;
        this.comment_date =  details.comment_date;
        this.c_content =  details.c_content;
        this.mediaProduct = details.m_id;
    }
}