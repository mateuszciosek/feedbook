export class Post {
    public title: string;
    public author: {};
    public content: string;
    public likes: number;

    constructor(json: any) {
        this.title = json.title;
        this.author = json.author;
        this.content = json.content;
        this.likes = json.likes_count;
    }
}