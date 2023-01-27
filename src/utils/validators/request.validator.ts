import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const registerValidator = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('register', { error: errors.array() });
    }
    next();
  },
];

export const loginValidator = [
  body('email', 'Please include a valid email !').isEmail(),
  body('password', 'Password is required !').exists(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('login', { error: errors.array() });
    }
    next();
  },
];

export const emailValidator = [
  body('email', 'Please include a valid email').isEmail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const createNews = [
  body('title', 'Title is required').not().isEmpty(),
  body('description', 'Description is required').not().isEmpty(),
  body('author', 'Author is required').not().isEmpty(),
  body('videoLink', 'Video Link is required').optional(),
  body('category', 'Category is required').not().isEmpty(),
  body('latest', 'latest is required').optional(),
  body('featured', 'featured is required').optional(),
  body('trending', 'Trending is required').optional(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('create_news', { error: errors.array() });
    }
    next();
  },
];


export const updateNews = [
  body('title', 'Title is required').not().isEmpty(),
  body('description', 'Description is required').not().isEmpty(),
  body('videoLink', 'Video Link is required').optional(),
  body('category', 'Category is required').not().isEmpty(),
  body('latest', 'latest is required').not().isEmpty(),
  body('featured', 'featured is required').not().isEmpty(),
  body('trending', 'Trending is required').not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req.headers);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];