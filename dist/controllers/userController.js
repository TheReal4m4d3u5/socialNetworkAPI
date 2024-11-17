import User from '../models/User.js';
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find()
            .select('-__v') // Exclude the __v field
            .populate('thoughts', '-__v') // Populate thoughts and exclude __v if needed
            .populate('friends', '-__v'); // Populate friends and exclude __v if needed
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// create a new user
export const createUser = async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
