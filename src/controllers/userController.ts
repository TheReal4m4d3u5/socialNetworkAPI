import User from '../models/User.js';
import Thought from '../models/thought.js';
import { Request, Response } from 'express';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select('-__v')
      .populate('thoughts', '-__v')
      .populate('friends', '-__v');

    res.json(users);
  } catch (err) {
    res.status(500).json(err)
  }

  // try {
  //   const users = await User.find();
  //   res.status(200).json(users);
  // } catch (error) {
  //   res.status(500).json({ message: 'Failed to get users', error });
  // }
}
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get user', error });
  }

  //   try {
  //     const user = await User.findById(req.params.id);
  //     if (!user) {
  //         return res.status(404).json({ message: 'User not found' });
  //     }
  //     return res.status(200).json(user);
  // } catch (error) {
  //     return res.status(500).json({ message: 'Failed to get user', error });
  // }

}


export const deleteUser = async (req: Request, res: Response) => {
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
}



export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error });
  }
}



export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update user', error });
  }
}

export const createFriend = async (req: Request, res: Response) => {
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
}

export const deleteFriend = async (req: Request, res: Response) => {
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
}
