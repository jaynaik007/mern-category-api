// types/AuthRequest.ts

import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: any; // or a more specific type, like { userId: string }
}
