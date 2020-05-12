import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService extends ApiService<User>{

  getAll(params) {
    return this.get();
  }

  getOne(id: number) {
    return this.get(id);
  }

  deleteOne(id: number) {
    return this.delete(id);
  }

  create(data) {
    return this.post(data);
  }

  register(data) {
    return this.post(data, './register');
  }

  update(id, data) {
    return this.put(id, data);
  }

  updateSelf(id, data) {
    return this.put(id + '/update', data);
  }

  protected url(): string {
    return 'user';
  }
}
