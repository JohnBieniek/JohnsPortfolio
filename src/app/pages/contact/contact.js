
import {

  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {constructor() { Contact.prototype.__init.call(this); }
   __init() {this.breadcrumbs = [{ label: 'Contact' }]}
}
