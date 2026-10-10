import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    company: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    role: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);