import {Injectable} from '@angular/core';
import {ApiService} from '../../helpers/helpers';
import {Classroom} from '../classroom/classroom.service';
import {tap} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {Course} from '../course/course.service';
import {Task} from '../task/task.service';
import {Assignement} from '../assignment/assignement.service';
import {AuthPersistenceService} from "../core/services/authPersistence.service";

export type SignIn = {
  email: string;
  password: string;
};
export type SignUp = SignIn & {
  name: string;
  user: boolean;
};
export type Teacher = {
  id: string;
  email: string;
  name: string;
  avatar_color: string;
  classes: Classroom[];
  user: boolean;
};
export type Student = {
  id: string;
  email: string;
  name: string;
  avatar_color: string;
  classes: Classroom[];
  responseTasks: any[];
  responseAssignments: any[];
  user: boolean;
};
export type User = Teacher | Student;
@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(private api: ApiService,private readonly CookieService:CookieService,private router:Router,private readonly authPersistenceService:AuthPersistenceService) {
    if (this.CookieService.get('auth')) {
      this.getUser()
    } else {
      this.logout();
      router.navigate(['/auth/login']);
    }
  }

  signIn(data: SignIn) {
    return this.api.post<{token:String}>(`/user/signin`, data).pipe(
      tap((res: any) => {
        if (res.token) {
          this.CookieService.deleteAll("auth")
          this.CookieService.set('auth', res.token, {
            expires: 1,
            path: '/',
            secure: true,
            sameSite: 'Strict'
          });
          localStorage.setItem("auth", "true")
          this.getUser()
        }
      }),
    );
  }
  signUp(data: SignUp) {
    return this.api.post<User>(`/user/signup`, data).pipe(
      tap((res: any) => {
        if (res.token) {
          this.CookieService.deleteAll('auth')
          this.CookieService.set('auth', res.token, {
            expires: 1,
            path: '/',
            secure: true,
            sameSite: 'Strict'
          });
          localStorage.setItem("auth", "true")
        }
      }),
    );
  }
  logout() {
    this.CookieService.deleteAll("auth");
    this.authPersistenceService.userSubject.next({} as User);
    localStorage.setItem("auth","true")
  }

  getUser() {
    return this.api.get<User>(`/user/current`,false,false).pipe(
      tap((res) => {
        this.authPersistenceService.userSubject.next(res);
        this.router.navigate(['/classroom']);
      }),
      catchError((err) => {
        console.log("hi")
        this.logout();
        return err;
      })
    ).subscribe()
  }

  getAll() {
    return this.api.get<{courses:Course[][],tasks:Task[][],assignments:Assignement[][]}>(`/user/all`);
  }
}
