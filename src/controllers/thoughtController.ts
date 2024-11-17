import Thought from '../models/thought.js';
import { Request, Response } from 'express';


export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thought = await Thought.find();
    //.populate({ path: 'tags', select: '-__v' }); ??????
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get thought', error });
  }
}

export const getSingleThought = async (req: Request, res: Response) => {

  try {
    const post = await Thought.findOne({ _id: req.params.postId })
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