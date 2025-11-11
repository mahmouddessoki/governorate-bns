import { Component, computed, input } from '@angular/core';
import { infoRes } from '../../shared/models/info';
import { CardComponent } from "../../shared/components/ui/card/card.component";
import { SectionHeaderComponent } from "../../shared/components/ui/section-header/section-header.component";
import { SectionComponent } from "../../shared/components/ui/section/section.component";

@Component({
  selector: 'app-governorates',
  imports: [CardComponent, SectionHeaderComponent, SectionComponent],
  templateUrl: './governorates.component.html',
  styleUrl: './governorates.component.scss',
})
export class GovernoratesComponent {
  gov = input.required<infoRes>();
  mainGovs = computed(() => this.gov().data);
}
