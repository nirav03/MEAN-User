import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from './user.model'
import { Register } from './register.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  user: User[];
  readonly baseURL = 'http://localhost:3800/';

  constructor(private http: HttpClient) { }

    postUser(user: User){
      return this.http.post(this.baseURL + 'user/create/', user)
    }
    updateUser(_id,data){
      return this.http.put(this.baseURL + 'user/' +`${_id}`,data);
    }
    getUserList(){
      return this.http.get(this.baseURL + 'list');
    }
    getUserById(_id: string){
      return this.http.get(this.baseURL + 'user/' +`${_id}`);
    }
    deleteUser(_id: string){
    return this.http.delete(this.baseURL + 'user/' + `${_id}`);
    }
    postRegister(register: Register) {
      return this.http.post<Register>(this.baseURL + 'register', register);
    }
    postLogin(body) {
      return this.http.post(this.baseURL + '', body);
    }
    logedIn(){
      return (!!localStorage.getItem('currentUser') && !!localStorage.getItem('Password'));
    }

}
