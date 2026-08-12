
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectsLink } from '../projects-link/projects-link';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, ProjectsLink],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css'
})
export class SiteHeader {
  scrollHomeToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}
