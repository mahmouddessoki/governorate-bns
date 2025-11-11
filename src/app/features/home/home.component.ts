import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { SectionHeaderComponent } from '../../shared/components/ui/section-header/section-header.component';
import { Card } from '../../shared/models/card';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CardComponent, SectionHeaderComponent , NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  cards: Card[] = [
    { title: 'النوتة المعلوماتية', router: '/' },
    { title: 'القطاعات', router: '/sectors' },
    { title: 'المحافظة', router: '/governorates' },
    { title: 'المراكز', router: '/centers' },
    { title: 'الوحدات المحليه', router: '/local-units' },
    { title: 'القرى', router: '/villages' },
    { title: 'المشرفين', router: '/' },
    { title: 'سجل النشاط', router: '/' },
  ];
}
