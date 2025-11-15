import { Component, computed, input, OnInit } from '@angular/core';
import { infoRes, subSectorRes } from '../../shared/models/info';
import { SectionComponent } from '../../shared/components/ui/section/section.component';

@Component({
  selector: 'app-sub-sector',
  imports: [SectionComponent],
  templateUrl: './sub-sector.component.html',
  styleUrl: './sub-sector.component.scss',
})
export class SubSectorComponent implements OnInit {
  subSectors = input.required<subSectorRes>();
  mainSubSectors = computed(() => this.subSectors().data.sub_sectors);

  ngOnInit(): void {
    console.log('SubSectors data:', this.mainSubSectors());
  }
}
