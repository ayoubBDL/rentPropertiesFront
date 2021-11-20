import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm!: FormGroup
  user!:User
  userSubmitted!: boolean
  constructor(private fb: FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl(null,Validators.required),
    //   email: new FormControl(null,[Validators.required, Validators.email]),
    //   password:new FormControl(null,[Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null,[Validators.required,]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    // })
    this.createRegisterationForm()
  }

  createRegisterationForm(){
    this.registrationForm = this.fb.group({
      userName:[null,Validators.required],
      email:[null,[Validators.required, Validators.email]],
      password:[null,[Validators.required, Validators.minLength(8)]],
      confirmPassword:[null,Validators.required],
      mobile:[null, [Validators.required, Validators.maxLength(10)]]
    })
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = this.registrationForm.get('password')!.value;
    let confirmPass = this.registrationForm.get('confirmPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  get userName(){
    return this.registrationForm.get('userName') as FormControl;
  }

  get email(){
    return this.registrationForm.get('email') as FormControl
  }

  get password(){
    return this.registrationForm.get('password') as FormControl
  }

  get mobile(){
    return this.registrationForm.get('mobile') as FormControl
  }

  onSubmit(){
    console.log(this.registrationForm.value)
    this.userSubmitted = true
    if(this.registrationForm.valid){
      // this.user= Object.assign(this.user, this.registrationForm.value)
      this.userService.addUser(this.userData())
      this.registrationForm.reset()
      this.userSubmitted = false
    }
  }

  userData():User{
    return this.user = {
      userName:this.userName.value,
      email:this.email.value,
      password:this.password.value,
      mobile:this.mobile.value

    }
  }

}
