
import {
  BreadcrumbsComponent,

} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-trial-by-rotation',
  imports: [BreadcrumbsComponent],
  standalone: true,
  templateUrl: './trial-by-rotation.html',
  styleUrl: './trial-by-rotation.css'
})
export class TrialByRotation {constructor() { TrialByRotation.prototype.__init.call(this); }
   __init() {this.breadcrumbs = [
    { label: 'Trial by Rotation', route: 'projects/trial-by-rotation' },
    { label: 'Overview' },
  ]}
}
