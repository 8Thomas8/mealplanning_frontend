import {Injectable, Optional} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CsrfService} from '../csrf/csrf.service';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<T> {

  /** API base from environment + path for resource. Value without final slash. */
  private apiUrl: string = null;

  /** Constructor. */
  constructor(@Optional() private readonly http: HttpClient, private csrfService: CsrfService) {
    this.apiUrl = environment.apiUrl.replace(/\/$/, '') + '/' + this.url().replace(/^\/?(.*?)\/?$/g, '$1');
  }

  /** Proxy to perform GET HTTP requests. */
  protected get(url: string|number = '', params: HttpParams = null, headers = this.buildHeaders()) {
    return this.http.get<any>(this.buildUrl(url), {params, headers});
  }
  /** Proxy to perform POST HTTP requests. */
  protected post(data: {[key: string]: any}, url: string = '', headers = this.buildHeaders()) {
    return this.http.post<any>(this.buildUrl(url), data, {headers});
  }

  /** Proxy to perform PUT HTTP requests. */
  protected put(url: string|number = '', data: {[key: string]: any}, headers = this.buildHeaders()) {
    return this.http.put<any>(this.buildUrl(url), data, {headers});
  }

  /** Proxy to perform DELETE HTTP requests. */
  protected delete(url: string|number = '', headers = this.buildHeaders()) {
    return this.http.delete<any>(this.buildUrl(url), {headers});
  }

  /** Gives the specific API part of current service. */
  protected abstract url(): string;

  /** Builds the complete URL from final part escaping '/' problems. */
  private buildUrl(url: string|number) {
    return this.apiUrl + `/${url}`.replace(/\/\//g, '');
  }

  private buildHeaders() {
    return new HttpHeaders().set(this.csrfService.getCsrfHeaderName(), this.csrfService.getCsrfToken());
  }
}
