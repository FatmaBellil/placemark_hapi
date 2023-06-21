import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
    name: String,
    description: String,
    latitude: Number,
    longitude: Number,
    img: String,
    categoryid: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);