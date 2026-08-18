import { Component } from '@angular/core';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-sonic-shielding',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './sonic-shielding.html',
  styleUrl: './sonic-shielding.css',
})
export class SonicShielding {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Sonic Shielding', route: '/projects/sonic-shielding' },
    { label: 'Overview' },
  ];
}
