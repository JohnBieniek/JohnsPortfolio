import { Component } from '@angular/core';
import { BreadcrumbsComponent, BreadcrumbItem } from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-sonic-shielding-home',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './sonic-shielding-home.html',
  styleUrl: '../sonic-shielding-info.css',
})
export class SonicShieldingHome {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Sonic Shielding', route: '/projects/sonic-shielding' },
    { label: 'Extension Home' },
  ];
}
