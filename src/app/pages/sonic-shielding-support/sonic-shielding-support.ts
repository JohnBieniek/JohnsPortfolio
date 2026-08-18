import { Component } from '@angular/core';
import { BreadcrumbsComponent, BreadcrumbItem } from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({ selector: 'app-sonic-shielding-support', standalone: true, imports: [BreadcrumbsComponent], templateUrl: './sonic-shielding-support.html', styleUrl: '../sonic-shielding-info.css' })
export class SonicShieldingSupport {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Sonic Shielding', route: '/projects/sonic-shielding' },
    { label: 'Support' },
  ];
}
