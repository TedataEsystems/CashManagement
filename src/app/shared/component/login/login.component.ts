import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  warning=false;
  form:FormGroup=new FormGroup({
    userName: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)

  });
  LoginModel= new Login();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private AccountService:AccountService,
    @Inject(DOCUMENT) private document: Document
    )
    {
      this.titleService.setTitle("Login");
    }

  ngOnInit(): void {


  }

  onSubmit() {
      if (this.form.invalid) {
          return;
      }
      console.log(this.form.value);
      this.LoginModel.userName=this.form.value.userName;
      this.LoginModel.password=this.form.value.password;

console.log(this.LoginModel.userName);
console.log(this.LoginModel.password);
console.log(this.LoginModel,"pp");
this.AccountService.login(this.LoginModel).subscribe(res=>
  {
    console.log("1",res);
    if(res.status)
    {
      console.log("2");
      localStorage.setItem("tokenNumber", res.token);
        localStorage.setItem("userName", res.userName);
        localStorage.setItem("team", res.team);
        localStorage.setItem("role", res.role);
        this.router.navigate(["/summary"]);
    }
    else
    {
      console.log("3");
      this.warning=true;
    }}, err => {
      console.log("4");
      this.warning=true;

  });

        // window.location.href="/"


  //  this.router.navigate(['/'], { relativeTo: this.route });
    }





}
