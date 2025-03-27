import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username: string = '';

  constructor(private readonly router: Router) {}
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
  }

  // logout
  logOut() {
    this.router.navigateByUrl('');
    localStorage.clear();
  }
}
