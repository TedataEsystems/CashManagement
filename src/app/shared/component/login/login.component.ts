import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  warning=false;
  form:FormGroup=new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)

  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,


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



        // window.location.href="/"


   this.router.navigate(['/'], { relativeTo: this.route });
    }





}
