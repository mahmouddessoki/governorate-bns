import { Component, computed, input } from '@angular/core';
import { SectionComponent } from "../../shared/components/ui/section/section.component";
import { infoRes } from '../../shared/models/info';

@Component({
  selector: 'app-local-units',
  imports: [SectionComponent],
  templateUrl: './local-units.component.html',
  styleUrl: './local-units.component.scss',
})
export class LocalUnitsComponent {
  localUnits = input.required<infoRes>();
  mainLocalUnits = computed(() => this.localUnits().data);
}
