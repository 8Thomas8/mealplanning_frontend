import {User} from './user';

export class CurrentUser extends User {
  enabled: boolean;
  authorities: string;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
}
