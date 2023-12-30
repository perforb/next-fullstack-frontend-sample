import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_ATLAS_HOST}/nextAppDataBase?retryWrites=true&w=majority`);
    console.log("Success: Connected to MongoDB.");
  } catch (e) {
    console.log("Failure: Unconnected to MongoDB.");
    throw e;
  }
};

export default connectMongoDB;