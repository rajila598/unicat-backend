const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
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
    message: {
        type: String,
        required: true
    }
    
});

const Contact= mongoose.model("Contact", ContactSchema);

module.exports = Contact;
