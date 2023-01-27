import mongoose from 'mongoose';

export interface NewsLetterDocument {
  email: string;
  date: Date;
}

const NewsLetterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const newsLetterModel = mongoose.model<NewsLetterDocument>('NewsLetter', NewsLetterSchema);

export default newsLetterModel;