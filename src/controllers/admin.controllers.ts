import adminServices from '../services/admin.services';
import newsServices from '../services/news.services';
import { Request, Response } from 'express';
import { AdminDocument } from '../models/admin.model';
import bcrypt from 'bcrypt';
import { MessageResponse } from '../interfaces/MessageResponse';
import jwt, { Secret } from 'jsonwebtoken';

require('dotenv').config();

export const SECRET_KEY: Secret = process.env.JWT_SECRET as Secret;

export async function register(req: Request, res: Response): Promise<Response<MessageResponse>> {
  try {
    const { name, email, password } = req.body;

    const admin = await adminServices.getAdminByEmail(email);

    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    let newAdmin: AdminDocument = {
      name: name,
      email: email,
      password: hashedPassword,
      date: new Date(),
    };

    await adminServices.createAdmin(newAdmin);

    return res.status(201).json({ message: 'Admin created' });

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function loginAdmin(req: Request, res: Response) {

  try {

    const { email, password } = req.body;

    const admin = await adminServices.getAdminByEmail(email);

    if (!admin) {
      return res.status(400).render('login', { message: 'Invalid credentials' });
    }

    const isMatch: Boolean = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).render('login', { message: 'Invalid credentials' });
    }

    const payload = {
      id: admin.id,
      name: admin.name,
    };

    let token = jwt.sign(payload, SECRET_KEY, { expiresIn: 360000 });

    if (!token) {
      return res.status(400).render('login', { message: 'Invalid credentials' });
    }

    return res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    }).status(200).render('create_news', {
      name: admin.name,
    });

  } catch (error: any) {
    return res.status(500).render('login', { message: error.message });
  }
}

export async function logoutAdmin(req: Request, res: Response) {
  try {
    return res.clearCookie('access_token').status(200).render('login', { message: 'Logged out' });
  } catch (error: any) {
    return res.status(500).render('login', { message: error.message });
  }
}

export async function getLoginPage(req: Request, res: Response) {
  try {
    return res.status(200).render('login');
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getCreateNewsPage(req: Request, res: Response) {
  try {
    return res.status(200).render('create_news', {
      name: res.locals.name,
    });
  } catch (error: any) {
    return res.status(500).render('login', { message: error.message });
  }
}

export async function getNewsPage(req: Request, res: Response) {
  try {
    const news = await newsServices.getNews();
    if (news.length === 0) {
      return res.status(200).render('get_news', { news: [], message: 'No news found' });
    } else {
      return res.status(200).render('get_news', { news: news });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}


export async function getNewsLetterPage(req: Request, res: Response) {
  try {
    const result = await newsServices.getNewsLetters();
    if (!result) {
      return res.status(404).render('Newsletter', { message: 'News not found' });
    } else {
      return res.status(200).render('Newsletter', { newsLetter: result });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}