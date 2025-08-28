import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  items = [
    {
      title: ' الصفحة الرئيسية',
      router: '/home',
      img: '/images/icons/home-smile.svg',
    },
    {
      title: 'النوتة المعلوماتية',
      router: '/informative-note',
      img: '/images/icons/ticket.svg',
    },
    {
      title: 'القطاعات',
      router: '/sectors',
      img: '/images/icons/ticket.svg',
    },
    {
      title: 'المحافظة',
      router: '/',
      img: '/images/icons/ticket.svg',
    },
    {
      title: 'المراكز',
      router: '/',
      img: '/images/icons/ticket.svg',
    },
    {
      title: 'الوحدات المحليه',
      router: '/',
      img: '/images/icons/ticket.svg',
    },
    {
      title: 'القرى',
      router: '/',
      img: '/images/icons/ticket.svg',
    },
    {
      title: 'المشرفين',
      router: '/',
      img: '/images/icons/users.svg',
    },
    {
      title: 'سجل النشاط',
      router: '/',
      img: '/images/icons/settings.svg',
    },
    {
      title: 'super admin',
      router: '/',
      img: '/images/avatar.svg',
    },
  ];
}
