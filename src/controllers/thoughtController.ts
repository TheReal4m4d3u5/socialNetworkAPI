import Thought from '../models/thought.js';
import { Request, Response } from 'express';
import User from '../models/User.js';

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thought = await Thought.find();
    //.populate({ path: 'tags', select: '-__v' }); ??????
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get thought', error });
  }
}

export const updatedThought = async (req: Request, res: Response) => {
  try {
    // Extract the _id from the route parameters
    const { id } = req.params;

    // Find and update the thought
    const updatedThought = await Thought.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }


    return res.json(updatedThought);
  } catch (error) {
    return res.status(500).json({ message: 'Erro' });
  }
}



export const getSingleThought = async (req: Request, res: Response) => {

  try {
    const post = await Thought.findOne({ _id: req.params.Id})
    if (!post) {
      res.status(404).json({ message: 'No though with that ID' });
    } else {
      res.json(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}


export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
}


export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.Id);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    // Remove the thought reference from the associated user's thoughts array
    await User.updateOne(
      { thoughts: thought._id },
      { $pull: { thoughts: thought._id } }
    );

    return res.status(200).json({ message: 'Thought deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }

}



export const createReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId } = req.params;
    const reaction = req.body; // Assuming the reaction data is sent in the body

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: reaction } }, // Adds the new reaction object to the reactions array of the thought document. Add the reaction as a subdocument
      { new: true, runValidators: true } //Ensures that the new reaction data adheres to the schema's validation rules.
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought here not found' });
    }

    return res.status(200).json(updatedThought);
  } catch (error) {
    console.error('Error adding reaction:', error);
    return res.status(500).json({ message: 'Failed to add reaction', error: error });
  }
};


export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId, reactionId } = req.params;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId: reactionId } } },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought or reaction not found' });
    }

    return res.status(200).json(updatedThought);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to remove reaction', error });
  }
};