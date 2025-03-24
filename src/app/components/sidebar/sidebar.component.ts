import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  sidebarRoutes = [
    {
      route: 'home',
      icon: 'https://img.icons8.com/offices/30/home.png',
    },
    {
      route: 'products',
      icon: 'https://img.icons8.com/dusk/30/shopping-cart--v1.png',
    },
    {
      route: 'categories',
      icon: 'https://img.icons8.com/arcade/30/categorize.png',
    },
  ];

  isActiveTab = false;

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  checkActiveTab(route: string) {
    let url;
    this.activatedRoute.url.subscribe((value) => {
      url = value;
    });
  }
}
