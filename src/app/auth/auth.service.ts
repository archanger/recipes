import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token: string;

  constructor(private router: Router) { }

  signupUser(email: string, password: string) {
    auth().createUserWithEmailAndPassword(email, password)
    .catch(
      error => console.log('error :', error)
    );
  }

  signinUser(email: string, password: string) {
    auth().signInWithEmailAndPassword(email, password)
    .then(
      response => {
        auth().currentUser.getIdToken().then(token => this.token = token);
        this.router.navigate(['/']);
      }
    )
    .catch(
      error => console.log('error :', error)
    );
  }

  getToken() {
    auth().currentUser.getIdToken().then(
      token => this.token = token
    );
    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

  logout() {
    auth().signOut();
    this.token = null;
  }
}
