import { Schema, model, Types } from 'mongoose';
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
const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length || 0; // Return the length of the reactions array
});
const Thought = model('Thought', thoughtsSchema);
export default Thought;
