export class userAlreadyExistsError extends Error {
    constructor() {
        super("Email Already Exist")
    }

}