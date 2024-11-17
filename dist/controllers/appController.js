import { Application, User } from '../models/index.js';
//getApplications function (retrieving application data).
// handles the retrieval of all application records from the database
export const getApplications = async (_req, res) => {
    try {
        // Attempt to retrieve all applications from the Application model
        const applications = await Application.find();
        res.json(applications);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// This method handles the retrieval of a single application record by its unique ID
export const getSingleApplication = async (req, res) => {
    try {
        // Retrieve the application using the application ID from the request parameters
        const application = await Application.findOne({ _id: req.params.applicationId });
        if (!application) {
            return res.status(404).json({ message: 'No application with that ID' });
        }
        res.json(application);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// find a user and add an application
export const createApplication = async (req, res) => {
    try {
        const application = await Application.create(req.body);
        const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { applications: application._id } }, { new: true });
        if (!user) {
            return res.status(404).json({
                message: 'Application created, but found no user with that ID',
            });
        }
        res.json('Created the application 🎉');
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
// This method handles updating an existing application record by its unique ID
export const updateApplication = async (req, res) => {
    try {
        // Find the application by ID and update it with the new data from the request body
        const application = await Application.findOneAndUpdate({ _id: req.params.applicationId }, { $set: req.body }, { runValidators: true, new: true });
        if (!application) {
            return res.status(404).json({ message: 'No application with this id!' });
        }
        res.json(application);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
// This method handles deleting an application record by its unique ID and removing its reference from the associated user
export const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findOneAndDelete({ _id: req.params.applicationId });
        if (!application) {
            return res.status(404).json({ message: 'No application with this id!' });
        }
        const user = await User.findOneAndUpdate({ applications: req.params.applicationId }, { $pull: { applications: req.params.applicationId } }, { new: true });
        if (!user) {
            return res.status(404).json({
                message: 'Application created but no user with this id!',
            });
        }
        res.json({ message: 'Application successfully deleted!' });
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// This method handles adding a new tag to an existing application by its unique ID
export const addTag = async (req, res) => {
    try {
        const application = await Application.findOneAndUpdate({ _id: req.params.applicationId }, { $addToSet: { tags: req.body } }, { runValidators: true, new: true });
        if (!application) {
            return res.status(404).json({ message: 'No application with this id!' });
        }
        res.json(application);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// This method handles removing a specific tag from an existing application by the application and tag IDs
export const removeTag = async (req, res) => {
    try {
        const application = await Application.findOneAndUpdate({ _id: req.params.applicationId }, { $pull: { tags: { tagId: req.params.tagId } } }, { runValidators: true, new: true });
        if (!application) {
            return res.status(404).json({ message: 'No application with this id!' });
        }
        return res.json(application);
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
