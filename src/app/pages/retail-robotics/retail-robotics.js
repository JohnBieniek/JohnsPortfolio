
import {

  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-retail-robotics',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './retail-robotics.html',
  styleUrl: './retail-robotics.css',
})
export class RetailRobotics {constructor() { RetailRobotics.prototype.__init.call(this); }
   __init() {this.breadcrumbs = [
    { label: 'Vision Mapping', route: '/projects/retail-robotics' },
    { label: 'Overview' },
  ]}
}
