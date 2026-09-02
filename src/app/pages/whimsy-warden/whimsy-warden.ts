import { Component } from '@angular/core';
import {
  BreadcrumbItem,
  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-whimsy-warden',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './whimsy-warden.html',
  styleUrl: './whimsy-warden.css',
})
export class WhimsyWarden {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Whimsy Warden', route: '/projects/whimsy-warden' },
    { label: 'Overview' },
  ];
}
