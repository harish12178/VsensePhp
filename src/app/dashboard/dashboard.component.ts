import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VsensephpapiService } from '../Services/vsensephpapi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
  user;
  temperature=0;
  humidity=0;
  vibration=0;
  current=0;
  puller;
  today:Date;
  location:string="bangalore";
  constructor(private service:VsensephpapiService,private router:Router) { }

  ngOnInit(): void {
    this.user=localStorage.getItem("user");
    if(this.user==undefined || this.user==null){
      this.router.navigate(['login']);
    }
    this.getcvalues('');
    setInterval(()=>{
      this.today=new Date();
    },1000);

  }
  getValues(location:string){
    this.service.gettempvalue(location).subscribe(res=>{
      // console.log(res);
      this.temperature=res.value;
    });
    this.service.getvibrvalue(location).subscribe(res=>{
      // console.log(res);
      this.vibration=res.value;
    });
    this.service.getcrntvalue(location).subscribe(res=>{
      // console.log(res);
      this.current=res.value;
    });
    this.service.gethumdvalue(location).subscribe(res=>{
      // console.log(res);
      this.humidity=res.value;
    });
  }
  getcvalues(loc:string){
    this.puller=setInterval(() => {
      this.getValues(loc); 
      }, 30000);
  }
  locationch(loc:string){
    this.location=loc;
    var locid;
    if(this.location=="bangalore"){
      locid='';
      this.getValues(locid);
    }
    else if(this.location=="coimbatore"){
      locid='1';
      this.getValues(locid);
    }
    else if(this.location=="chennai"){
      locid='2';
      this.getValues(locid);
    }
    else{
      locid='3';
      this.getValues(locid);
    }
    clearInterval(this.puller);
    this.getcvalues(locid);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
  ngOnDestroy(){
    clearInterval(this.puller);
  }

}
