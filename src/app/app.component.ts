import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private formBuilder: FormBuilder){}
  title = 'SpotifySongGuesserFront';

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  // tslint:disable-next-line:typedef
  onSubmit(){
    console.log(this.loginForm.get('email').value);
    console.log(this.loginForm.get('password').value);
  }
  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }
}
