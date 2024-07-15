import { model, Schema } from "mongoose";

const SubscriberSchema = new Schema({
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
});

const Subscriber = model("Subscriber", SubscriberSchema);

export default Subscriber;
