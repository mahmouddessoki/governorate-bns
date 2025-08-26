import { Component, signal, WritableSignal } from '@angular/core';
import { Card } from '../../shared/models/card';
import { CardComponent } from "../../shared/components/ui/card/card.component";
import { SectionHeaderComponent } from "../../shared/components/ui/section-header/section-header.component";

@Component({
  selector: 'app-sectors',
  imports: [CardComponent, SectionHeaderComponent],
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.scss'
})
export class SectorsComponent {
 sectorCards : WritableSignal<Card[]>  = signal( [
    {title: 'السكان ', router: '/'},
    {title: 'الزراعة', router: '/'},
    {title: 'التعليم', router: '/'},
    {title: 'التعليم الفني', router: '/'},
    {title: 'الثقافة', router: '/'},
    {title: 'البريد', router: '/'},
    {title: 'التموين', router: '/'},
    {title: 'الفصل الواحد', router: '/'},
    {title: 'السكان ', router: '/'},
    {title: 'الزراعة', router: '/'},
    {title: 'التعليم', router: '/'},
    {title: 'التعليم الفني', router: '/'},
    {title: 'الثقافة', router: '/'},
    {title: 'البريد', router: '/'},
    {title: 'التموين', router: '/'},
    {title: 'الفصل الواحد', router: '/'},
    {title: 'الثقافة', router: '/'},
    {title: 'البريد', router: '/'},
    {title: 'التموين', router: '/'},
    {title: 'الفصل الواحد', router: '/'},
  ]
)
}
