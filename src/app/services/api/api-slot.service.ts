import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Slot} from '../../models/slot';

@Injectable({
  providedIn: 'root'
})
export class ApiSlotService extends ApiService<Slot> {

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

  update(id, data) {
    return this.put(id, data);
  }

  protected url(): string {
    return 'slot';
  }
}

