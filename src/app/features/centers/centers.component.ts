import { Component, computed, input } from '@angular/core';
import { infoRes } from '../../shared/models/info';
import { SectionComponent } from "../../shared/components/ui/section/section.component";

@Component({
  selector: 'app-centers',
  imports: [SectionComponent],
  templateUrl: './centers.component.html',
  styleUrl: './centers.component.scss',
})
export class CentersComponent {
  centers = input.required<infoRes>();
  mainCenters = computed(() => this.centers().data);
}
