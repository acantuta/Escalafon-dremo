import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  icon: string;
  title: string;
  route?: string;
  requiredPermission: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  
  menuItems: MenuItem[] = [
    {
      icon: 'folder',
      title: 'Gestión de Legajos',
      route: '/principal/inicio',
      requiredPermission: 'area-usuaria'
    },
    {
      icon: 'build',
      title: 'Mantenimiento',
      route: '/principal/mantenimiento',
      requiredPermission: 'mantenimiento'
    }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.authService.getFullName();
  }

  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  get hasAnyPermission(): boolean {
    return this.menuItems.some(item => this.hasPermission(item.requiredPermission));
  }
}
