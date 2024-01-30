export default class userModel {
    id!: number | null
    name!: string
    username!: string
    email!: string

    constructor(id: number | null, name: string, username: string, email: string) {
        this.id = id
        this.name = name
        this.username = username
        this.email = email
    }
}