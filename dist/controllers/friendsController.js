import { Friend } from '../models/index.js';
/**
 * GET All Courses /courses
 * @returns an array of
*/
export const getAllFriends = async (_req, res) => {
    try {
        const friends = await Friend.find();
        res.json(friends);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
 * GET Friend based on id /friend/:id
 * @param string id
 * @returns a single Friend object
*/
export const getFriendById = async (req, res) => {
    const { friendId } = req.params;
    try {
        const freind = await Friend.findById(friendId);
        if (freind) {
            res.json(freind);
        }
        else {
            res.status(404).json({
                message: 'Friend not found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
/**
* POST Friend /friends
* @param object username
* @returns a single Course object
*/
export const createFriend = async (req, res) => {
    const { course } = req.body;
    try {
        const newCourse = await Friend.create({
            course
        });
        res.status(201).json(newCourse);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
/**
 * PUT Course based on id /friends/:id
 * @param object id, username
 * @returns a single Friend object
*/
export const updateFriend = async (req, res) => {
    try {
        const course = await Friend.findOneAndUpdate({ _id: req.params.friendId }, { $set: req.body }, { runValidators: true, new: true });
        if (!course) {
            res.status(404).json({ message: 'No friends with this id!' });
        }
        res.json(course);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
/**
* DELETE Course based on id /courses/:id
* @param string id
* @returns string
*/
export const deleteFriend = async (req, res) => {
    try {
        const friend = await Friend.findOneAndDelete({ _id: req.params.friendId });
        if (!friend) {
            res.status(404).json({
                message: 'No friend with that ID'
            });
        }
        else {
            await Friend.deleteMany({ _id: { $in: friend } }); // I don't know if this line is correct 
            res.json({ message: 'Friend deleted!' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
