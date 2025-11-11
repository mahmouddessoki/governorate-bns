import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;
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
      router: '/governorates',
      img: '/images/icons/ticket.svg',
    },
    {
      title: 'المراكز',
      router: '/centers',
      img: '/images/icons/ticket.svg',
    },
    {
      title: 'الوحدات المحليه',
      router: '/local-units',
      img: '/images/icons/ticket.svg',
    },
    {
      title: 'القرى',
      router: '/villages',
      img: '/images/icons/ticket.svg',
    },
    {
      title: 'المشرفين',
      router: '/',
      img: '/images/icons/users.svg',
    },
    {
      title: 'سجل النشاط',
      router: '/activity',
      img: '/images/icons/settings.svg',
    },
    {
      title: 'super admin',
      router: '/',
      img: '/images/avatar.svg',
    },
  ];

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  toggleSidebar() {
    this.sidebar.nativeElement.classList.toggle('show');
  }
}
