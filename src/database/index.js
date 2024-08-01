// KnAHgSdTVFHWM5pg

import mongoose from "mongoose";

const connectToDB = async () => {
  const DataBaseURL =
    "mongodb+srv://intekhabulhaque26:KnAHgSdTVFHWM5pg@jobportal.bjw0tgh.mongodb.net/?retryWrites=true&w=majority&appName=JobPortal";

  (mongoose.connect(DataBaseURL))
    .then(() => console.log("Connection Established"))
    .catch((err) => console.log(err));
};

export default connectToDB;
