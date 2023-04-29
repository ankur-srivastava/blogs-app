import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 10,
        max:  100
    },
    content: {
        type: String,
        required: true,
        min: 50,
        max:  500
    },
    created: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userName: String
})

export default mongoose.model('Blog', blogSchema)
