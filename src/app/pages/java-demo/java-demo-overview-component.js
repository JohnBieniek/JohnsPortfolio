import {

  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { NgFor } from '@angular/common';

import {
  BreadcrumbsComponent,

} from '../../shared/breadcrumbs/breadcrumbs-component';


















@Component({
  selector: 'app-java-demo-overview',
  standalone: true,
  imports: [NgFor, BreadcrumbsComponent],
  templateUrl: './java-demo-overview-component.html',
  styleUrl: './java-demo-overview-component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class JavaDemoOverviewComponent {constructor() { JavaDemoOverviewComponent.prototype.__init.call(this);JavaDemoOverviewComponent.prototype.__init2.call(this);JavaDemoOverviewComponent.prototype.__init3.call(this);JavaDemoOverviewComponent.prototype.__init4.call(this);JavaDemoOverviewComponent.prototype.__init5.call(this);JavaDemoOverviewComponent.prototype.__init6.call(this); }
  __init() {this.breadcrumbs = [
    { label: 'Java Demo', route: '/java-demo' },
    { label: 'Overview' },
  ]}

  __init2() {this.badges = [
    { label: 'Java 26', icon: 'devicon:java' },
    { label: 'Spring Boot', icon: 'devicon:spring' },
    { label: 'Gradle', icon: 'devicon:gradle' },
    { label: 'H2 Database', icon: 'simple-icons:h2database' },
    { label: 'Swagger / OpenAPI', icon: 'simple-icons:swagger' },
    { label: 'GraphQL', icon: 'simple-icons:graphql' },
    { label: 'SQL / JPA', icon: 'mdi:database' },
    { label: 'Docker', icon: 'devicon:docker' },
  ]}

  __init3() {this.stackItems = [
    { label: 'Java 26', icon: 'devicon:java' },
    { label: 'Spring Boot', icon: 'devicon:spring' },
    { label: 'Gradle', icon: 'devicon:gradle' },
    { label: 'H2 Database', icon: 'simple-icons:h2database' },
    { label: 'Swagger / OpenAPI', icon: 'simple-icons:swagger' },
    { label: 'Docker', icon: 'devicon:docker' },
  ]}

  __init4() {this.stackFooterItems = [
    { label: 'REST', icon: 'mdi:api' },
    { label: 'JSON', icon: 'mdi:code-json' },
    { label: 'JPA / Hibernate', icon: 'simple-icons:hibernate' },
  ]}

  __init5() {this.featureCards = [
    {
      title: 'Release Demos',
      icon: 'mdi:language-java',
      description: 'Explore language features from Java 8 through 9, 10, 11, 21, and 26.',
    },
    {
      title: 'Endpoints for SQL & JPA',
      icon: 'mdi:database-search',
      description:
        'REST endpoints showcasing repositories, queries, relationships, and data access patterns.',
    },
    {
      title: 'REST & GraphQL APIs',
      icon: 'simple-icons:graphql',
      description:
        'Swagger UI, OpenAPI, and GraphiQL make the REST and GraphQL APIs browsable and easy to test.',
    },
    {
      title: 'H2 Console Access',
      icon: 'simple-icons:h2database',
      description: 'Browse and query the in-memory H2 database directly during local development.',
    },
    {
      title: 'Java 9 Module Demo',
      icon: 'mdi:cube-outline',
      description: 'A separate module demonstrates the Java Platform Module System.',
    },
    {
      title: 'Run Anywhere',
      icon: 'mdi:rocket-launch-outline',
      description:
        'Run locally, package as a JAR, containerize with Docker, or deploy to cloud hosting.',
    },
  ]}

  __init6() {this.coverageItems = [
    'Examples from multiple Java releases',
    'Interview exercises for common backend topics',
    'Polymorphism examples',
    'SQL and JPA demonstrations',
    'In-memory H2 database exploration',
    'API-first architecture exposed through Swagger/OpenAPI',
    'GraphQL queries with an interactive GraphiQL explorer',
    'Cloud-ready deployment workflow',
  ]}
}
