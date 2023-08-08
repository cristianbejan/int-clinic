import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Patient } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  loggedUser!: Patient;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => (this.loggedUser = user));
  }

  onLogOut() {
    this.authService.SignOut();
    this.router.navigate(['login']);
    console.log(this.loggedUser);
  }
}
