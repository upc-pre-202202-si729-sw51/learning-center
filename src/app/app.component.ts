import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'learning-center';
  options = [
    { path: '/home', title: 'Home'},
    { path: '/students', title: 'Students'},
    { path: '/instructors', title: 'Instructors'},
    { path: '/about', title: 'About'}
  ]
}
