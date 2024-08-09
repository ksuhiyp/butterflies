export type RateButterflyDto = {
    butterflyId: string
    userId: string
    rating: number
}

export type ButterFlyUserRate = {
    userId: string
    butterflyId: string
    rating: number
}

export type Butterfly  = {
    id: string
    commonName: string
    species: string
    article: string
    rating?: ButterFlyUserRate
}



