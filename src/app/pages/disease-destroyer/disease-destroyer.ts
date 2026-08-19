import { Component } from '@angular/core';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-disease-destroyer',
  imports: [BreadcrumbsComponent],
  standalone: true,
  templateUrl: './disease-destroyer.html',
  styleUrl: './disease-destroyer.css',
})
export class DiseaseDestroyer {
  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Disease Destroyer', route: 'projects/disease-destroyer' },
    { label: 'Overview' },
  ];
}
