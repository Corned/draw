const { Schema, model } = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
    unique: true,
  },
  authKey: {
    type: String,
    minlength: 20,
    maxlength: 20,
    required: false,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room"
    }
  ],
})

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.authKey
  }
})

userSchema.plugin(uniqueValidator)

const User = model("User", userSchema)

module.exports = User