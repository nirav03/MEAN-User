import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  p: number = 1;
  user: User[];
  searchText: any;
  constructor(private userService : UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.refreshUserList();
  }

  refreshUserList() {
    this.userService.getUserList().subscribe((res) => {
      this.user = res as User[];
    });
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.refreshUserList();
      });
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate([''])
  }

  key: string = '';
  reverse: boolean = false;  
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
