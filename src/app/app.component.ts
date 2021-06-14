import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient){}
  title = 'SpotifySongGuesserFront';

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  // tslint:disable-next-line:typedef
  onSubmit(){
    this.login();
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

  // tslint:disable-next-line:typedef
  login(){
    let data = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.http.post<any>('http://localhost:3000/login', data).subscribe(res => {
      console.log(res);
    });
  }
}
