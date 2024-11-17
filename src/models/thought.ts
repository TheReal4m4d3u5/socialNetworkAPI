import { Schema, model, type Document, Types } from 'mongoose';

interface IThoughts extends Document {
    thoughtText: string;
    createdAt: Date | undefined;
    username:string;
    reactions?: Types.ObjectId[];
}

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

const thoughtsSchema = new Schema<IThoughts>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280, 
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp:  number | Date) => new Date(timestamp).toLocaleString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true, 
        },
        id: false, 
    }
);

thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length || 0; // Return the length of the reactions array
});

const Thought = model<IThoughts>('Thought', thoughtsSchema);

export default Thought;
