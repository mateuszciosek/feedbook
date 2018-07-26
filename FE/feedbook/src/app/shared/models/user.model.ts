export class User {
    private username: string;

    constructor(json: any) {
        this.username = json.username
    }
}