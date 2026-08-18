import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
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
export class SonicShielding implements AfterViewInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Sonic Shielding', route: '/projects/sonic-shielding' },
    { label: 'Overview' },
  ];

  ngAfterViewInit(): void {
    const video = this.host.nativeElement.querySelector<HTMLVideoElement>('#sonic-hero-video');
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;
    if (typeof video.play === 'function') {
      void video.play().catch(() => undefined);
    }
  }
}
