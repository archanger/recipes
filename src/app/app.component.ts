import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';
  
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyB_FMDHA7ecxLq-9vVfEndOqL5-4hAi6BI',
      authDomain: 'recipe-85408.firebaseapp.com'
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
