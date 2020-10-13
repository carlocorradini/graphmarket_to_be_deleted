import jwt from 'jsonwebtoken';
import config from '@app/config';
import { IJWT, IJWTPayload } from '@app/types';

export default class JWTHelper {
  public static async sign(payload: IJWTPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        config.JWT.SECRET,
        {
          expiresIn: config.JWT.EXPIRATION_TIME,
          subject: payload.id,
        },
        (error, token) => {
          if (error) reject(error);
          resolve(token);
        },
      );
    });
  }

  public static async verify(token: string): Promise<IJWT> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.JWT.SECRET, (error, decoded) => {
        if (error) reject(error);
        resolve(decoded as IJWT);
      });
    });
  }
}
