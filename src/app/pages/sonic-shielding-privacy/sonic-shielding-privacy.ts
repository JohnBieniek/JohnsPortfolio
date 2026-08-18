import { Component } from '@angular/core';
import { BreadcrumbsComponent, BreadcrumbItem } from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({ selector: 'app-sonic-shielding-privacy', standalone: true, imports: [BreadcrumbsComponent], templateUrl: './sonic-shielding-privacy.html', styleUrl: '../sonic-shielding-info.css' })
export class SonicShieldingPrivacy {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Sonic Shielding', route: '/projects/sonic-shielding' },
    { label: 'Privacy Policy' },
  ];
}
