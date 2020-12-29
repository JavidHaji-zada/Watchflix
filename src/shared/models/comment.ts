export class Comment {
    username: string = ''
    comment_id: string = ''
    replied_to: string = ''
    comment_date: Date = new Date()
    c_content: string = ''
    m_id: string = ''

    constructor(details?: any) {
        console.log('create new comment from ', details)
        if (details) {
            this.username = details.username;
            this.comment_id = details.comment_id;
            this.replied_to = details.reply_to;
            this.comment_date = new Date(details.comment_date);
            this.c_content = details.c_content;
            this.m_id = details.m_id;
        }
    }
}