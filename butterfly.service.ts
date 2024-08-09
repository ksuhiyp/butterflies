// define a functoin that creates a new butterfly rating

import { db } from "./db";
import { ButterflyNotFound, ButterflyRatingExists, UserNotFound } from "./exception";
import { Butterfly, ButterFlyUserRate, RateButterflyDto } from "./types";


export const rateButterFly = async (payload: RateButterflyDto): Promise<ButterFlyUserRate> => {
    return new Promise((res, rej) => {
        try {

            // find the user
            const user = db.users.find((user) => user.id === payload.userId)
            if (!user) throw UserNotFound
            // find the butterfly
            const butterfly = db.butterflies.find((butterfly) => butterfly.id === payload.butterflyId)
            if (!butterfly) throw ButterflyNotFound

            // create a new rating
            const newRating: ButterFlyUserRate = {
                userId: payload.userId,
                butterflyId: payload.butterflyId,
                rating: payload.rating
            }

            // find if the user has already rated the butterfly
            const userButterflyRating = db.users_butterflies_reviews.find((rating) => rating.userId === payload.userId && rating.butterflyId === payload.butterflyId)
            if (userButterflyRating) throw ButterflyRatingExists
            const updatedButterflyRating = db.users_butterflies_reviews.push(newRating)
            res(newRating)

        } catch (error: any) {
            if (error instanceof UserNotFound)
                console.log(error.message)
            rej(error)
        }
    })



}

// get butterflies ratings
export const getAllButterflies = async (sort: 'ASC' | 'DESC'): Promise<Butterfly[]> => {
    return new Promise((res, rej) => {
        try {
            // fetch butterflies from db and mao them to user ratings and sort them by rating ASC
            const butterfliesWithRatings = db.butterflies.map((butterfly) => {
                return {
                    ...butterfly,
                    rating: db.users_butterflies_reviews.find((rating) => rating.butterflyId === butterfly.id)
                }
            }).sort((a: any, b: any) => {
                if (sort === 'ASC') return a.rating - b.rating
                else
                    return b.rating - a.rating
            })

            res(butterfliesWithRatings)
        } catch (error) {
            console.error(error)
            rej(error)
        }

    })
}