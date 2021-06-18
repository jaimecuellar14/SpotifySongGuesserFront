import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  generos: any[] = [ { nombre: 'Rock alternativo', selected: false},
   { nombre: 'Indie', selected: false}, { nombre: 'Pop', selected: false}, { nombre: 'Jazz', selected: false} ];
  constructor() { }

  ngOnInit(): void {
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
