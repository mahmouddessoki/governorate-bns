import { Component, effect, input } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  link = input<string>('');

  constructor(private router: Router) {
    effect(() => {
      console.log(this.link(), 'aaaa');
    });
  }

  activity() {
    this.router.navigate(['/activity'], { queryParams: { id: 3 } });
  }
}
