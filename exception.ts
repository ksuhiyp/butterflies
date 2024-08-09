export class UserNotFound extends Error {

    constructor(error) {
        super(error)
        this.name = 'UserNotFound'
        this.message = 'User not found'
    }
}

export class ButterflyNotFound extends Error {
    constructor(error) {
        super(error)
        this.name = 'ButterflyNotFound'
        this.message = 'Butterfly not found'
    }
}

export class ButterflyRatingExists extends Error {
    constructor(error) {
        super(error)
        this.name = 'ButterflyRatingExists'
        this.message = 'User has already rated this butterfly'
    }
}

export class InvalidRequestPayload extends Error {
    constructor(error) {
        super(error)
        this.name = 'InvalidRequestPayload'
        this.message = 'Invalid request payload'
    }
}