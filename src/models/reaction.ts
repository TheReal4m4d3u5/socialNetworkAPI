import { Schema, type Document, Types } from 'mongoose';

interface IReaction extends Document {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username:string;
    createdAt?:  number | Date;
}

const reactionSchema = new Schema<IReaction>(
    {
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
            get: (timestamp: number | Date) => new Date(timestamp).toLocaleString(), // Format the date
        },
    },
    {
        toJSON: {
            getters: true, 
        },
        id: false, 
    }
);

export default reactionSchema;