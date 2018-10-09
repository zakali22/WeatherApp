const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  first_name: String,
  last_name: String,
  email: String,
  username: String,
  password: String,
  facebookId: String,
  googleId: String,
  image: {
    type: String,
    default:
      "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=113636006274386&height=50&width=50&ext=1541469489&hash=AeRoGBFqPCzpHyQ2"
  }
});

mongoose.model("Users", userSchema);
