


@Directive({
  selector: '[appProjectsLink]',
  standalone: true,
  host: {
    '(click)': 'navigateToProjects($event)',
  },
})
export class ProjectsLink {
  constructor(  router) {;this.router = router;}

  async navigateToProjects(event) {
    event.preventDefault();
    await this.router.navigate(['/']);

    setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const projects = document.getElementById('projects');
          const header = document.querySelector('.site-header');

          if (!projects || !header) {
            return;
          }

          const destination = window.scrollY
            + projects.getBoundingClientRect().top
            - header.getBoundingClientRect().height
            - 16;

          window.scrollTo({ top: Math.max(0, destination), left: 0, behavior: 'auto' });
        });
      });
    }, 0);
  }
}
