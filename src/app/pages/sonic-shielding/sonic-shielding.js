
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
export class SonicShielding {constructor() { SonicShielding.prototype.__init.call(this); }
   __init() {this.breadcrumbs = [
    { label: 'Sonic Shielding', route: '/projects/sonic-shielding' },
    { label: 'Overview' },
  ]}
}
