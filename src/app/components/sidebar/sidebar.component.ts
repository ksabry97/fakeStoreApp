import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  sidebarRoutes = [
    {
      route: '',
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
}
