import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    RouterLink
  ],
  templateUrl: './navigation-bar.component.html',
  standalone: true,
  styleUrl: './navigation-bar.component.sass'
})
export class NavigationBarComponent {
  protected logOut() {
    localStorage.removeItem("jwt")
    window.location.href = "/"
  }
}
