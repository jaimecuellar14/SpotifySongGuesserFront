import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  generos: any[] = [ { nombre: 'Rock alternativo', selected: false},
   { nombre: 'Indie', selected: false}, { nombre: 'Pop', selected: false}, { nombre: 'Jazz', selected: false} ];
  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', environment.client_id)
      .set('client_secret', environment.client_secret);
    this.httpClient.post<any>('https://accounts.spotify.com/api/token', body).subscribe( res => {
      console.log(res);
      this.cookieService.set('spotify-token', res.access_token);
      this.cookieService.set('token_type', res.token_type);
    });
  }

  selectGender(gender){
    gender.selected = !gender.selected;
  }

  checkSelectedGenders(){
    let selectedGenders = this.generos.filter(elem => elem.selected === true);
    console.log(selectedGenders);
  }

  next(){
    this.checkSelectedGenders();
  }
}
