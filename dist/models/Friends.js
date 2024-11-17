import { Schema, model } from 'mongoose';
const friendsSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
    },
    friendSince: {
        type: Date,
        default: Date.now,
    },
    mutualFriendsCount: {
        type: Number,
        default: 0,
    },
}, {
    toJSON: {
        virtuals: true,
    },
    timestamps: true,
});
const Friends = model('Course', friendsSchema);
export default Friends;
