
import { BreadcrumbsComponent, } from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({ selector: 'app-sonic-shielding-privacy', standalone: true, imports: [BreadcrumbsComponent], templateUrl: './sonic-shielding-privacy.html', styleUrl: '../sonic-shielding-info.css' })
export class SonicShieldingPrivacy {constructor() { SonicShieldingPrivacy.prototype.__init.call(this); }
   __init() {this.breadcrumbs = [
    { label: 'Sonic Shielding', route: '/projects/sonic-shielding' },
    { label: 'Privacy Policy' },
  ]}
}
