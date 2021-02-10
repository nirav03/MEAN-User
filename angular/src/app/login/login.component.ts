import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Register } from '../shared/register.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
register = new Register();

  constructor(private userService : UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      this.router.navigate(['user']);
    }
  }

  onSubmit(){
    console.log(this.register);
    
    this.userService.postLogin(this.register).subscribe(
      (data: any) => {
      if(data.status === 1 )
      {
        localStorage.setItem('currentUser', JSON.stringify(data.token));
        localStorage.setItem('Email',JSON.stringify(this.register.email));
        localStorage.setItem('Password',JSON.stringify(data.password));
        console.log("Login Success", data);
        this.router.navigate(['user']);
      }
      if(data.status === 0){
        if(data.status_code === 200){
        console.log(data.message);
       }
      if(data.status_code === 202) {
        console.log(data.message)
       }}
    },
    )
  }
  
}
