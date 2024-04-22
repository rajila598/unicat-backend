const mongoose = require("mongoose");
const { LECTURER, STUDENT } = require("../constant/role");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    phone: Number,
    address: {
        street: {
            type: String,
        },
        ward: {
            type: Number,
        },
    },
    email: {
        type: String,
        required: true,

        /* custom validation -- check email valid*/
        validate: {
            validator: async (value) => {
                // let matched = await User.find({email: value})
                let matched = await mongoose.models.User.findOne({ email: value });
                if (matched) {
                    return false;
                }
            },
            message: "email already used",
        },
    },
    role: {
        type: String,
        enum: [LECTURER, STUDENT],
        required: true,
        set: (value) => {
            console.log(value);
            return value.toLowerCase();
        },
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
