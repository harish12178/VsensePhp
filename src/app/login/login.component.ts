import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VsensephpapiService } from '../Services/vsensephpapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  loading:boolean;
  error:boolean=false;
  error1:boolean=false;
  constructor(private formBuilder:FormBuilder,private service:VsensephpapiService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  loginClicked(): void {
    if (this.loginForm.valid) {
      this.error=false;
      this.error1=false;
        this.loading = true;
        this.service
            .login(
                this.loginForm.get("username").value,
                this.loginForm.get("password").value
            )
            .subscribe(
                (data) => {
                    console.log(data);
                    if(data.length==0){
                      this.loading = false;
                      this.error=true;
                    }
                    else{
                      localStorage.setItem("user",data[0].username);
                      this.error=false;
                      this.error1=false;
                      this.router.navigate(['dashboard']);
                    }
                },(err)=>{
                  this.loading = false;
                  console.log(err);
                  console.log(err.status);
                    this.error1=true;
                });
    } else {
        Object.keys(this.loginForm.controls).forEach((key) => {
            const abstractControl = this.loginForm.get(key);
            abstractControl.markAsDirty();
        });
    }
}
}
