import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

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

  login(){
    let data = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.http.post<any>('http://localhost:3000/login', data).subscribe(res => {
      console.log(res);
    });
  }

  get email(){ return this.loginForm.get('email'); }
  get password(){ return this.loginForm.get('password'); }
}
