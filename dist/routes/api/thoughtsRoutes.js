import { Router } from 'express';
import Thought from '../../models/thought.js';
import User from '../../models/User.js';
import { getSingleThought, getThoughts, createThought } from '../../controllers/thoughtController.js';
const router = Router();
// organizes your routes better instead of writing each HTTP method separately.
router.route('/').get(getThoughts).post(createThought);
router.route('/:postId').get(getSingleThought);
router.delete('/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought)
            return res.status(404).json({ message: 'Thought not found' });
        // Remove the thought reference from the associated user's thoughts array
        await User.updateOne({ thoughts: thought._id }, { $pull: { thoughts: thought._id } });
        return res.status(200).json({ message: 'Thought deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const reaction = req.body; // Assuming the reaction data is sent in the body
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: reaction } }, // Adds the new reaction object to the reactions array of the thought document. Add the reaction as a subdocument
        { new: true, runValidators: true } //Ensures that the new reaction data adheres to the schema's validation rules.
        );
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought here not found' });
        }
        return res.status(200).json(updatedThought);
    }
    catch (error) {
        console.error('Error adding reaction:', error);
        return res.status(500).json({ message: 'Failed to add reaction', error: error });
    }
});
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId: reactionId } } }, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought or reaction not found' });
        }
        return res.status(200).json(updatedThought);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to remove reaction', error });
    }
});
export default router;
