
import {

  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-lakeland-cabaret',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './lakeland-cabaret.html',
  styleUrl: './lakeland-cabaret.css',
})
export class LakelandCabaret {constructor() { LakelandCabaret.prototype.__init.call(this); }
   __init() {this.breadcrumbs = [
    { label: 'Lakeland Cabaret', route: '/projects/lakeland-cabaret' },
    { label: 'Overview' },
  ]}
}
