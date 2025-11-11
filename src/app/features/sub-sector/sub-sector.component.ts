import { Component, computed, input } from '@angular/core';
import { infoRes, subSectorRes } from '../../shared/models/info';
import { SectionComponent } from "../../shared/components/ui/section/section.component";

@Component({
  selector: 'app-sub-sector',
  imports: [SectionComponent],
  templateUrl: './sub-sector.component.html',
  styleUrl: './sub-sector.component.scss',
})
export class SubSectorComponent {
  subSectors = input.required<subSectorRes>();
  mainSubSectors = computed(() => this.subSectors().data.sub_sectors);
}
