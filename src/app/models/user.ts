import {Planning} from './planning';

export class User {
  id?: number;
  username: string;
  email?: string;
  password: string;
  passwordConfirmation?: string;
  plannings?: Planning[];
}
