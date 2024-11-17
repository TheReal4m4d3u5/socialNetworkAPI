import { Schema, model } from 'mongoose';
//todo Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
const userSchema = new Schema({
    username: {
        type: String,
        Unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match a valid email address'],
        //match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,'Please enter a valid email address',],
    },
    //thoughts and friends fields are arrays ([]) to allow multiple references
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought', // Reference to the Thought model
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
const User = model('User', userSchema);
export default User;
