import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentRoute: string;
  menuItems: Array<Record<string, string>> = [
    { name: 'Characters', route: '/characters' },
    { name: 'Random death', route: '/random_death' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }
}
