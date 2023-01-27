import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

require('dotenv').config();

export const SECRET_KEY: Secret = process.env.JWT_SECRET as Secret;

export interface Token {
  id: JwtPayload;
  name: JwtPayload;
}

export async function authenticateAdmin(req: Request, res: Response, next: NextFunction) {

  try {

    const token = req.cookies.access_token;


    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY) as Token;

    if (!decoded) {
      throw new Error();
    }

    req.body.id = decoded.id;
    req.body.name = decoded.name;

    next();

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}