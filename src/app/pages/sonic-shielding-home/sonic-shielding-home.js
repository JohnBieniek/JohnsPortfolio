
import { BreadcrumbsComponent, } from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-sonic-shielding-home',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './sonic-shielding-home.html',
  styleUrl: '../sonic-shielding-info.css',
})
export class SonicShieldingHome {constructor() { SonicShieldingHome.prototype.__init.call(this); }
   __init() {this.breadcrumbs = [
    { label: 'Sonic Shielding', route: '/projects/sonic-shielding' },
    { label: 'Extension Home' },
  ]}
}
