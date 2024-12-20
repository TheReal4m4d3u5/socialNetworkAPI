import { Schema, Types } from 'mongoose';
const tagSchema = new Schema({
    tagId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    tagBody: {
        type: String,
        required: true,
        maxlength: 25,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});
export default tagSchema;
