import newsService from '../services/news.services';
import { Request, Response } from 'express';
import { NewsDocument } from '../models/news.model';
import { MessageResponse } from '../interfaces/MessageResponse';
import { Comment } from '../models/news.model';
import { ContactDocument } from '../models/contact.model';

interface ImageObject {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export async function createNews(req: Request, res: Response) {
  try {

    const { title, description, author, videoLink, category, latest, featured, trending } = req.body;

    // Check if news already exists
    const isNewsExist = await newsService.getNewsByTitle(title.split(' ').join('-'));

    if (!!isNewsExist) {
      return res.status(400).render('create_news', { message: 'News already exists' });
    }

    let images: string[] = [];

    if (req.files) {
      const files: ImageObject[] = req.files as ImageObject[];
      for (let i = 0; i < files.length; i++) {

        const image = files[i];
        const splitUrlArray = image.destination.split('\\');
        let filteredUrl = splitUrlArray[splitUrlArray.length - 1];
        let imagePath = filteredUrl + '/' + image.filename;
        images.push(imagePath);
      }
    }

    let newNews: NewsDocument = {
      title: title.split(' ').join('-'),
      description: description,
      image: images,
      date: new Date(),
      author: author,
      videoLink: videoLink,
      category: category,
      latest: latest === 'true' ? true : false,
      featured: featured === 'true' ? true : false,
      trending: trending === 'true' ? true : false,
    };

    let result = await newsService.createNews(newNews);

    if (!result) {
      return res.status(500).render('create_news', { message: 'Something went wrong' });
    } else {
      return res.status(201).redirect('/admin/getNews');
    }

  } catch (error: any) {
    return res.status(500).render('create_news', { message: error.message });
  }
}

export async function getNewsByTitle(req: Request, res: Response) {
  try {

    const { title } = req.params;

    const news = await newsService.getNewsByTitle(title);

    if (!!news == false) {
      return res.status(404).redirect('back');
    } else {
      return res.status(200).render('single', { news: news });
    }

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getNews(req: Request, res: Response): Promise<Response<MessageResponse>> {
  try {

    const news = await newsService.getNews();

    if (news.length === 0) {
      return res.status(404).json({ message: 'News not found' });
    }

    return res.status(200).json(news);

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}


export async function makeTrending(req: Request, res: Response) {
  try {

    const id = req.params.id;

    // Check if news already exists
    const isNewsExist = await newsService.getNewsById(id);

    if (!isNewsExist) {

      const news = await newsService.getNews();

      if (news.length === 0) {
        return res.status(404).render('get_news', { message: 'News not found' });
      } else {
        return res.status(404).render('get_news', { message: 'News not found', news: news });
      }

    }

    let result = await newsService.makeTrending(id);

    if (!result) {
      const news = await newsService.getNews();
      if (news.length === 0) {
        return res.status(404).render('get_news', { message: 'News not found' });
      } else {
        return res.status(404).render('get_news', { message: 'something went wrong', news: news });
      }
    } else {
      return res.status(201).redirect('/admin/getNews');
    }

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function makeFeatured(req: Request, res: Response) {
  try {

    const id = req.params.id;

    // Check if news already exists
    const isNewsExist = await newsService.getNewsById(id);

    if (!isNewsExist) {

      const news = await newsService.getNews();

      if (news.length === 0) {
        return res.status(404).render('get_news', { message: 'News not found' });
      } else {
        return res.status(404).render('get_news', { message: 'News not found', news: news });
      }

    }

    let result = await newsService.makeFeatured(id);

    if (!result) {
      const news = await newsService.getNews();

      if (news.length === 0) {
        return res.status(404).render('get_news', { message: 'News not found' });
      } else {
        return res.status(404).render('get_news', { message: 'something went wrong', news: news });
      }
    } else {
      return res.status(201).redirect('/admin/getNews');
    }

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function makeLatest(req: Request, res: Response) {
  try {

    const id = req.params.id;

    // Check if news already exists
    const isNewsExist = await newsService.getNewsById(id);

    if (!isNewsExist) {

      const news = await newsService.getNews();

      if (news.length === 0) {
        return res.status(404).render('get_news', { message: 'News not found' });
      } else {
        return res.status(404).render('get_news', { message: 'News not found', news: news });
      }
    }

    let result = await newsService.makeLatest(id);

    if (!result) {
      const news = await newsService.getNews();

      if (news.length === 0) {
        return res.status(404).render('get_news', { message: 'News not found' });
      } else {
        return res.status(404).render('get_news', { message: 'something went wrong', news: news });
      }
    } else {
      return res.status(201).redirect('/admin/getNews');
    }

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getNewsById(req: Request, res: Response): Promise<Response<MessageResponse>> {
  try {

    const id = req.params.id;

    const news = await newsService.getNewsById(id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    return res.status(200).json(news);

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getTrendingNews(req: Request, res: Response): Promise<Response<MessageResponse>> {
  try {

    const news = await newsService.getTrendingNews();

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    return res.status(200).json(news);

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getLatestNews(req: Request, res: Response): Promise<Response<MessageResponse>> {
  try {

    const news = await newsService.getLatestNews();

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    return res.status(200).json(news);

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}


export async function getFeaturedNews(req: Request, res: Response): Promise<Response<MessageResponse>> {
  try {

    const news = await newsService.getFeaturedNews();

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    return res.status(200).json(news);

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteNews(req: Request, res: Response) {
  try {

    const id = req.params.id;

    const isNewsExist = await newsService.getNewsById(id);
    if (!isNewsExist) {
      const news = await newsService.getNews();
      if (news.length === 0) {
        return res.status(404).render('get_news', { message: 'News not found' });
      } else {
        return res.status(404).render('get_news', { message: 'News not found', news: news });
      }

    }
    const result = await newsService.deleteNews(id);

    if (!result) {
      const news = await newsService.getNews();

      if (news.length === 0) {
        return res.status(404).render('get_news', { message: 'News not found' });
      } else {
        return res.status(404).render('get_news', { message: 'something went wrong', news: news });
      }
    } else {
      return res.status(201).redirect('/admin/getNews');
    }

  } catch (error: any) {
    return res.status(500).redirect('/admin/getNews');
  }
}

export async function updateNews(req: Request, res: Response) {
  try {

    const id = req.params.id;

    const { title, description, author, videoLink, category, featured, latest, trending } = req.body;


    // Check if news already exists
    const isNewsExist = await newsService.getNewsById(id);

    if (!isNewsExist) {
      return res.status(404).json({ message: 'News not found' });
    }

    let images: string[] = [];

    if (req?.files?.length) {
      const files: ImageObject[] = req.files as ImageObject[];
      for (let i = 0; i < files.length; i++) {

        const image = files[i];
        const splitUrlArray = image.destination.split('\\');
        let filteredUrl = splitUrlArray[splitUrlArray.length - 1];
        let imagePath = filteredUrl + '/' + image.filename;
        images.push(imagePath);
      }
    } else {
      images = isNewsExist.image;
    }


    let newNews: NewsDocument = {
      title: title.split(' ').join('-'),
      description: description,
      image: images,
      date: new Date(),
      author: author,
      videoLink: videoLink,
      category: category,
      featured: featured == 'true' ? true : false,
      latest: latest == 'true' ? true : false,
      trending: trending == 'true' ? true : false,
    };

    const news = await newsService.updateNews(id, newNews);

    if (!news) {
      return res.status(404).render('update_news', {
        message: 'something went wrong',
        news: isNewsExist,
      });
    } else {
      return res.status(201).redirect('/admin/getNews');
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getHomePage(req: Request, res: Response) {
  try {
    const resultLatestNews = await newsService.getLatestNews();
    const resultTrendingNews = await newsService.getTrendingNews();
    const resultFeaturedNews = await newsService.getFeaturedNews();

    if (!resultLatestNews || !resultTrendingNews || !resultFeaturedNews) {
      return res.status(404).render('index', { message: 'News not found' });
    } else {
      return res.status(200).render('index', { latestNews: resultLatestNews, trendingNews: resultTrendingNews, featuredNews: resultFeaturedNews });
    }

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getContactPage(req: Request, res: Response) {
  try {
    return res.status(200).render('contact');
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getCategoryPage(req: Request, res: Response) {
  try {
    const resultLatestNews = await newsService.getLatestNews();
    const resultTrendingNews = await newsService.getTrendingNews();
    const resultFeaturedNews = await newsService.getFeaturedNews();
    if (!resultLatestNews || !resultTrendingNews || !resultFeaturedNews) {
      return res.status(404).render('category', { message: 'News not found' });
    } else {
      return res.status(200).render('category', { latestNews: resultLatestNews, trendingNews: resultTrendingNews, featuredNews: resultFeaturedNews });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getNewUpdatePage(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const isNewsExist = await newsService.getNewsById(id);
    if (!isNewsExist) {
      const news = await newsService.getNews();
      if (news.length === 0) {
        return res.status(404).render('get_news', { message: 'News not found' });
      } else {
        return res.status(404).render('get_news', { message: 'News not found', news: news });
      }
    } else {
      return res.status(200).render('update_news', { news: isNewsExist });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function subscribeNewsLetter(req: Request, res: Response) {
  try {

    const { email } = req.body;

    const newsLetter = await newsService.subscribeNewsLetter(email);
    if (!newsLetter) {
      return res.status(404).redirect('back');
    } else {
      return res.status(201).redirect('back');
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function addComment(req: Request, res: Response) {
  try {

    const id = req.params.id;
    const { name, email, comment } = req.body;

    const news = await newsService.getNewsById(id);
    if (!news) {
      return res.status(404).redirect('back');
    }

    const commentDocument: Comment = {
      name: name,
      email: email,
      comment: comment,
    };

    const newComment = await newsService.addComment(id, commentDocument);

    if (!newComment) {
      return res.status(404).redirect('back');
    } else {
      return res.status(201).redirect('back');
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function contactRequest(req: Request, res: Response) {
  try {
    const { name, email, message, subject } = req.body;

    const contactDetails: ContactDocument = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };

    const result = await newsService.contactRequest(contactDetails);
    if (!result) {
      return res.status(404).render('contact', { message: 'something went wrong' });
    } else {
      return res.status(201).render('contact', { message: 'Message sent successfully' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
