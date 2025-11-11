import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  cardRoute = input<string>();

}
