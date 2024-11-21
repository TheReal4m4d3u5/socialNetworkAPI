import { Router } from 'express';

//import mongoose from 'mongoose';
import { getSingleThought, getThoughts, createThought, updatedThought, deleteThought, createReaction, deleteReaction } from '../../controllers/thoughtController.js';

const router = Router();

// organizes your routes better instead of writing each HTTP method separately.
router.route('/').get(getThoughts).post(createThought);
router.route('/:Id').get(getSingleThought).put(updatedThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);



export default router;