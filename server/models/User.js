const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        completedMeetings: Number,
        image: { type: String },
        profession: { type: Schema.Types.ObjectId, ref: "Profession" },
        rate: Number,
        qualities: [{ type: Schema.Types.ObjectId, ref: "Quality" }],
        sex: { type: String, enum: ["male", "female", "other"] }
    },
    {
        timestamps: true
    }
);

module.exports = model("User", schema);
