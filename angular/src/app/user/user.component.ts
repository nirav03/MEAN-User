import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';

declare var M: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user = new User();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phonePattern = "[0-9]{10}";
  userId:any;
  constructor(private userService : UserService,
    private router: Router,
    private route: ActivatedRoute) {

     }

  ngOnInit(): void {
    this.userId=this.route.snapshot.params['_id'];
    if(this.userId){
     this.userService.getUserById(this.route.snapshot.params['_id']).subscribe((res:any) => {
         
         this.user = {
          name: res["name"],
          email: res["email"],
          phone: res["phone"],
          birthdate: res['birthdate'],
          gender: res['gender'],
          state : res['state'], 
          address:res['address']
        }
      })
    }else{
      this.resetForm();
    }
    
  }

  onSubmit(form: NgForm){
   // console.log(form.value);
    if(this.userId){
      this.userService.updateUser(this.route.snapshot.params['_id'],this.user).subscribe((res: any) => {
        console.log("Data Updated Successfully", res);
      })
    }else{
      this.userService.postUser(this.user).subscribe((res:any) => {
      console.log(res)
      });
    }
    this.router.navigate(['user']);
  }

 
  resetForm(form?: NgForm) {
    if (form)
    form.reset();
    this.userService.selectedUser = {
    name: "",
    email: "",
    phone: null,
    birthdate: "",
    gender: "",
    state : "",
    address: ""
  }
  }

logout(){
  localStorage.clear();
  this.router.navigate([''])
}

}
