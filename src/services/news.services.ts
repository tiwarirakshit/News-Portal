import { NewsDocument, Comment } from '../models/news.model';
import NewsModel from '../models/news.model';
import mongoose from 'mongoose';
import newsLetterModel from '../models/newsLetter.model';
import Contact, { ContactDocument } from '../models/contact.model';

const createNews = async (news: NewsDocument) => {
  try {

    const { title, description, category, image, date, author, videoLink, latest, featured, trending } = news;

    const newNews = new NewsModel({
      title,
      description,
      image,
      date,
      author,
      videoLink,
      category,
      latest,
      featured,
      trending,
    });

    return await newNews.save();

  } catch (error: any) {
    throw new Error(error);
  }
};

const getNewsByTitle = async (title: string) => {
  try {
    return await NewsModel.findOne({ title: title });
  } catch (error: any) {
    throw new Error(error);
  }
};

const getNews = async () => {
  try {
    return await NewsModel.find();
  } catch (error: any) {
    throw new Error(error);
  }
};

const getNewsById = async (id: string) => {
  try {
    return await NewsModel.findById({
      _id: new mongoose.Types.ObjectId(id),
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

const makeTrending = async (id: string) => {
  try {
    const news = await NewsModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { trending: true } },
      { new: true },
    );

    if (!news) {
      throw new Error('News not found');
    }

    return await news.save();

  } catch (error: any) {
    throw new Error(error);
  }
};

const makeFeatured = async (id: string) => {
  try {
    const news = await NewsModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { featured: true } },
      { new: true },
    );

    if (!news) {
      throw new Error('News not found');
    }

    return await news.save();

  } catch (error: any) {
    throw new Error(error);
  }
};

const makeLatest = async (id: string) => {
  try {
    const news = await NewsModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { latest: true } },
      { new: true },
    );

    if (!news) {
      throw new Error('News not found');
    }

    return await news.save();

  } catch (error: any) {
    throw new Error(error);
  }
};


const getTrendingNews = async () => {
  try {
    return await NewsModel.find({ trending: true }).sort({ date: -1 });
  } catch (error: any) {
    throw new Error(error);
  }
};

const getLatestNews = async () => {
  try {
    return await NewsModel.find({ latest: true }).sort({ date: -1 });
  } catch (error: any) {
    throw new Error(error);
  }
};

const getFeaturedNews = async () => {
  try {
    return await NewsModel.find({ featured: true }).sort({ date: -1 });
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateNews = async (id: string, news: NewsDocument) => {
  try {
    const { title, description, image, date, author, videoLink, featured, latest, trending } = news;

    const newNews = await NewsModel.findOneAndUpdate({
      _id: new mongoose.Types.ObjectId(id),
    }, {
      $set: {
        title,
        description,
        image,
        date,
        author,
        videoLink,
        featured,
        latest,
        trending,
      },
    }, { new: true },
    );

    if (!newNews) {
      throw new Error('News not found');
    }

    return await newNews.save();

  } catch (error: any) {
    throw new Error(error);
  }
};

const deleteNews = async (id: string) => {
  try {
    const news = await NewsModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (!news) {
      throw new Error('News not found');
    }

    return await news.save();

  } catch (error: any) {
    throw new Error(error);
  }
};

const subscribeNewsLetter = async (email: string) => {
  try {
    const newNewsLetter = new newsLetterModel({
      email,
    });

    return await newNewsLetter.save();

  } catch (error: any) {
    throw new Error(error);
  }
};

const addComment = async (id: string, comment: Comment) => {
  try {

    const news = await NewsModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $push: { comments: comment } },
      { new: true },
    );

    if (!news) {
      throw new Error('News not found');
    }

    return await news.save();

  } catch (error: any) {
    throw new Error(error);
  }

};

const contactRequest = async (contact: ContactDocument) => {
  try {
    const result = await Contact.create(contact);

    if (!result) {
      throw new Error('Contact not found');
    }

    return await result.save();

  } catch (error: any) {
    throw new Error(error);
  }
};

const getNewsLetters = async () => {
  try {
    const result = await newsLetterModel.find();
    if (!result) {
      throw new Error('No news letter found');
    }
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};


export default {
  createNews,
  getNewsByTitle,
  getNews,
  getNewsById,
  getTrendingNews,
  getLatestNews,
  getFeaturedNews,
  updateNews,
  deleteNews,
  makeTrending,
  makeFeatured,
  makeLatest,
  subscribeNewsLetter,
  addComment,
  contactRequest,
  getNewsLetters,
};
