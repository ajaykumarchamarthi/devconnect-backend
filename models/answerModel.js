const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
    createdAt: { type: Date, default: Date.now },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: [true, "Answer must belong to the question"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Answer must belong to a user"],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Like must belong to a user"],
      },
    ],
    numOfLikes: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

answerSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "answer",
  localField: "_id",
});

answerSchema.pre(/^find/, function (next) {
  this.populate({
    path: "likes",
    select: "_id name",
  })
    .populate({
      path: "user",
      select: "_id name",
    })
    .populate({
      path: "question",
      select: "_id question -user",
    });
  next();
});

module.exports = mongoose.model("Answer", answerSchema);
