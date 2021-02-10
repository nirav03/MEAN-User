import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Register } from '../shared/register.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  register = new Register();

  constructor(private userService : UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit(form: NgForm){
    console.log(form.value);
    this.userService.postRegister(form.value).subscribe((res: any) => {
    if(res.status === 0) {
      console.log("Email already exist")
      }
    else
     this.router.navigate(['']);
     });
  }
}
