import { ElementRef, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId: string;
  private clientSecret: string;
  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  get _clientId(){
    return this.clientId;
  }

  set _clientId(id){
    this.clientId = id;
  }

  get _clientSecret(){
    return this.clientSecret;
  }

  set _clientSecret(secret){
    this.clientSecret = secret;
  }


  getToken(){
    if (!this.cookieService.get('spotify-token')){
      const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);
      this.httpClient.post<any>('https://accounts.spotify.com/api/token', body).subscribe( res => {
      console.log(res);
      this.cookieService.set('spotify-token', res.access_token);
      this.cookieService.set('token_type', res.token_type);
    });
    }else{
      console.log('ya tiene token');
    }
  }

   getCategories(): Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.cookieService.get('spotify-token')}`);
    return this.httpClient.get<any>('https://api.spotify.com/v1/browse/categories', { headers });
  }

  refreshToken() {
    this.getToken();
  }
}
