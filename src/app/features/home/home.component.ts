import { Component } from '@angular/core';
import { CardComponent } from "../../shared/components/ui/card/card.component";
import { Card } from '../../shared/models/card';


@Component({
  selector: 'app-home',
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cards : Card[] = [
    {title: 'النوتة المعلوماتية', router: '/'},
    {title: 'القطاعات', router: '/'},
    {title: 'المحافظة', router: '/'},
    {title: 'المراكز', router: '/'},
    {title: 'الوحدات المحليه', router: '/'},
    {title: 'القرى', router: '/'},
    {title: 'المشرفين', router: '/'},
    {title: 'سجل النشاط', router: '/'},
  ]

}
