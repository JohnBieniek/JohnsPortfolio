
import {

  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-whimsy-warden',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './whimsy-warden.html',
  styleUrl: './whimsy-warden.css',
})
export class WhimsyWarden {constructor() { WhimsyWarden.prototype.__init.call(this); }
   __init() {this.breadcrumbs = [
    { label: 'Whimsy Warden', route: '/projects/whimsy-warden' },
    { label: 'Overview' },
  ]}
}
