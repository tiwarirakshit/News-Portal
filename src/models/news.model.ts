import mongoose from 'mongoose';

export interface Comment {
  name: string;
  email: string;
  comment: string;
}

export interface NewsDocument {
  title: string;
  description: string;
  image: string[];
  date: Date;
  author: string;
  category: string;
  videoLink?: string;
  trending?: boolean;
  latest?: boolean;
  featured?: boolean;
  comments?: Comment[];
}

const ImageSchema: mongoose.Schema<NewsDocument> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  trending: {
    type: Boolean,
    default: false,
  },
  latest: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  author: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    default: '',
  },
  comments: {
    type: [
      {
        name: String,
        email: String,
        comment: String,
      },
    ],
    default: [],
  },
});

const NewsModel = mongoose.model<NewsDocument>('News', ImageSchema);

export default NewsModel;