import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Planning} from '../../models/planning';

@Injectable({
  providedIn: 'root'
})
export class ApiPlanningService extends ApiService<Planning>{

  getAll() {
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
    return 'planning';
  }
}
