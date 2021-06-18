import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  generos: object[] = [ { nombre: 'Rock alternativo'}, { nombre: 'Indie'}, { nombre: 'Pop'}, { nombre: 'Jazz'} ];
  constructor() { }

  ngOnInit(): void {
  }

}
