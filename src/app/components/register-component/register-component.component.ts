import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(),
    name: new FormControl(),
    phoneNumber: new FormControl(),
    password: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit(){
    this.register();
  }

  // tslint:disable-next-line:typedef
  register(){
    const newUser = new User(this.registerForm.get('name').value, this.registerForm.get('email').value,
    this.registerForm.get('password').value, this.registerForm.get('phoneNumber').value);
    this.httpClient.post<User>('localhost:3000/register', newUser).subscribe(res => {
      console.log(res);
    });
  }

  // tslint:disable-next-line:typedef
  get email(){ return this.registerForm.get('email'); }
  // tslint:disable-next-line:typedef
  get name(){ return this.registerForm.get('name'); }
  // tslint:disable-next-line:typedef
  get phoneNumber(){ return this.registerForm.get('phoneNumber'); }
  // tslint:disable-next-line:typedef
  get password(){ return this.registerForm.get('password'); }
}
