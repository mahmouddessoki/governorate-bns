import { Component, computed, input } from '@angular/core';
import { infoRes } from '../../shared/models/info';
import { SectionComponent } from "../../shared/components/ui/section/section.component";

@Component({
  selector: 'app-villages',
  imports: [SectionComponent],
  templateUrl: './villages.component.html',
  styleUrl: './villages.component.scss',
})
export class VillagesComponent {
  villages = input.required<infoRes>();
  mainVillages = computed(() => this.villages().data);
}
