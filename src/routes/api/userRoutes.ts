import { Router } from 'express';
import User from '../../models/User.js';
import Thought from '../../models/thought.js'; // Assuming a Thought model exists

const router = Router();


router.get('/', async (_req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get users', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get user', error });
    }
});


router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create user', error });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json({ message: 'Failed to update user', error });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Bonus: Remove associated thoughts when deleting the user
        await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

        return res.status(200).json({ message: 'User deleted', deletedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete user', error });
    }
});


router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } }, // Add friend to friends array
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to add friend', error });
    }
});


router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } }, // Remove friend from friends array
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to remove friend', error });
    }
});



export default router;
