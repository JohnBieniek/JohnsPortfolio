import { ElementRef, inject } from '@angular/core';
import {
  BreadcrumbsComponent,

} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-sonic-shielding',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './sonic-shielding.html',
  styleUrl: './sonic-shielding.css',
})
export class SonicShielding  {constructor() { SonicShielding.prototype.__init.call(this);SonicShielding.prototype.__init2.call(this); }
    __init() {this.host = inject(ElementRef)}

   __init2() {this.breadcrumbs = [
    { label: 'Sonic Shielding', route: '/projects/sonic-shielding' },
    { label: 'Overview' },
  ]}

  ngAfterViewInit() {
    const video = this.host.nativeElement.querySelector('#sonic-hero-video');
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;
    if (typeof video.play === 'function') {
      void video.play().catch(() => undefined);
    }
  }
}
