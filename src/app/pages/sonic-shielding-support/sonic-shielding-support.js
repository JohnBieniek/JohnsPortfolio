
import { BreadcrumbsComponent, } from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({ selector: 'app-sonic-shielding-support', standalone: true, imports: [BreadcrumbsComponent], templateUrl: './sonic-shielding-support.html', styleUrl: '../sonic-shielding-info.css' })
export class SonicShieldingSupport {constructor() { SonicShieldingSupport.prototype.__init.call(this); }
   __init() {this.breadcrumbs = [
    { label: 'Sonic Shielding', route: '/projects/sonic-shielding' },
    { label: 'Support' },
  ]}
}
