import { Schema, Types } from 'mongoose';
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(), // Automatically generate a new ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280, // Maximum length of 280 characters
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Set the default value to the current timestamp
        get: (timestamp) => new Date(timestamp).toLocaleString(), // Format the date
    },
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});
export default reactionSchema;
