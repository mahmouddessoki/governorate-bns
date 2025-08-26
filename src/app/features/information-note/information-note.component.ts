import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { Card } from '../../shared/models/card';
import { CardComponent } from "../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-information-note',
  imports: [CardComponent],
  templateUrl: './information-note.component.html',
  styleUrl: './information-note.component.scss'
})
export class InformationNoteComponent {
  noteCards : WritableSignal<Card[]>  = signal( [
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
