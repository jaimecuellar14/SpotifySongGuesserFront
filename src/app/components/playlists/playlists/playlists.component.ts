import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../../services/spotify.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  categories: any;
  panelOpenState: boolean;
  constructor(private router: Router, private spotifyService: SpotifyService, private cookieService: CookieService) { }
  navigation = this.router.getCurrentNavigation();
  ngOnInit(): void {
    this.navigation.extras.state ? this.categories = this.navigation.extras.state.data :
     this.checkSavedSelectedCategories() ? this.getSelectedCategories() : this.returnToHome();
  }

  checkSavedSelectedCategories(){
    const savedCategories = JSON.parse(localStorage.getItem('selectedCategories'));
    console.log(savedCategories);
    const isData = savedCategories ? true : false;
    return isData;
  }

  getSelectedCategories() {
    this.categories = JSON.parse(localStorage.getItem('selectedCategories'));
  }

  returnToHome(){
    this.router.navigate(['home']);
  }

  getPlayList(id, index){
    const res = this.spotifyService.getPlayLists(id);
    console.log(res);
    res.subscribe((playlist) => {
      console.log(playlist);
      this.categories[index].playlists = playlist.playlists.items;
      console.log(this.categories[index]);
    },
    (error) => {
      console.log(error.error);
      if (error.error.error.message === 'The access token expired') {
        this.spotifyService._clientId = environment.client_id;
        this.spotifyService._clientSecret = environment.client_secret;
        const token = this.spotifyService.refreshToken();
        token.subscribe((res) => {
          this.cookieService.set('spotify-token', res.access_token);
          this.cookieService.set('token_type', res.token_type);
          this.getPlayList(id, index);
        }, (error) => {
          console.log(error);
        });
      }
    });
  }
}


