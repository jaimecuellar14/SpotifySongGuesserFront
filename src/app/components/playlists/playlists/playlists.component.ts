import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../../services/spotify.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  categories: any;
  panelOpenState: boolean;
  constructor(private router: Router, private spotifyService: SpotifyService) { }
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
    res.subscribe((playlist) => {
      this.categories[index].playlists = playlist.playlists.items;
      console.log(this.categories[index]);
    });
  }
}


