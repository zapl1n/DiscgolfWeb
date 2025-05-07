const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    fileName:{
        type: String,
        required: false,
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: false,
    },
    isUploaded:{
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;