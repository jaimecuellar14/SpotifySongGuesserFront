import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../../elements/category-dialog/category-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories;
  loaded: boolean;
  constructor(private httpClient: HttpClient, private cookieService: CookieService, private spotifyService: SpotifyService, 
              private cdr: ChangeDetectorRef, private router: Router, private dialog: MatDialog) { }

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
    return selectedGenders;
  }

  openDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent);

    dialogRef.afterClosed().subscribe(reuslt => {
      console.log('dialog closed');
    });
  }
  next(){
    const selectedGenders = this.checkSelectedGenders();
    if (selectedGenders.length !== 0){
      this.router.navigate(['playlists']);
    }else{
      this.openDialog();
      console.log('No category selected');
    }
  }
}
