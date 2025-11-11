import { Component, input } from '@angular/core';
import { info_card } from '../../../models/info';
import { CardComponent } from "../card/card.component";
import { SectionHeaderComponent } from "../section-header/section-header.component";

@Component({
  selector: 'app-section',
  imports: [CardComponent, SectionHeaderComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  infoCards = input.required<info_card[]>();
  infoHeader = input.required<string>()
}
