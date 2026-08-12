
import {

  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-paint-reorder-platform',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './paint-reorder-platform.html',
  styleUrl: './paint-reorder-platform.css',
})
export class PaintReorderPlatform {constructor() { PaintReorderPlatform.prototype.__init.call(this); }
   __init() {this.breadcrumbs = [
    { label: 'Paint Reorder Platform', route: '/projects/paint-reorder-platform' },
    { label: 'Overview' },
  ]}
}
