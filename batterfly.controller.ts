import { getAllButterflies, rateButterFly } from "./butterfly.service";
import { ButterflyNotFound, ButterflyRatingExists, InvalidRequestPayload } from "./exception";

const patchButterflyRating = async (req, res) => {
    try {
        const { butterflyId, userId, rating } = req.body;

        // Validate payload
        if (!butterflyId || !userId || typeof rating !== 'number' || rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Invalid request payload" });
        }

        // Call butterfly service to patch its resource
        const newRating = await rateButterFly({ butterflyId, userId, rating });
        return res.status(200).json(newRating);

    } catch (error) {
        console.error(`Error in ${patchButterflyRating.name}:`, error);
        if (error instanceof ButterflyNotFound || error instanceof ButterflyRatingExists || error instanceof InvalidRequestPayload) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getButterflies = async (req, res) => {
    try {
        // Call butterfly service to get all butterflies
        const sort = req.sort || 'ASC';
        const butterflies = await getAllButterflies(sort);
        return res.status(200).json(butterflies);
    } catch (error) {
        console.error("Error in getButterflies:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export { patchButterflyRating, getButterflies };