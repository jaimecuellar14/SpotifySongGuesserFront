import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { HttpClient , HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories;
  loaded: boolean;
  constructor(private httpClient: HttpClient, private cookieService: CookieService, private spotifyService: SpotifyService, 
              private cdr: ChangeDetectorRef ) { }

  ngOnInit() {
    this.loaded = false;
    this.spotifyService._clientId = environment.client_id;
    this.spotifyService._clientSecret = environment.client_secret;
    this.spotifyService.getToken();
    this.getCategories();
  }

  getCategories(){
    const categories = this.spotifyService.getCategories();
    categories.subscribe((res) => {
      this.loaded = true;
      this.categories = res.categories.items;
      this.modifyCategories(this.categories);
      this.cdr.detectChanges();
    });
  }

  modifyCategories(categories){
    categories.map((elem) => { elem.selected = false; });
    this.categories = categories;
    console.log(this.categories);
  }

  selectGender(gender){
    gender.selected = !gender.selected;
  }

  checkSelectedGenders(){
    let selectedGenders = this.categories.filter(elem => elem.selected === true);
    console.log(selectedGenders);
  }

  next(){
    this.checkSelectedGenders();
  }
}
