import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

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
      password: new FormControl('',[
        Validators.required
      ])
    });
  }

  onSubmit(){
    this.register();
  }

  register(){
    console.log(this.registerForm.get('email').value);
    console.log(this.registerForm.get('name').value);
    console.log(this.registerForm.get('phoneNumber').value);
    console.log(this.registerForm.get('password').value);
  }

}
