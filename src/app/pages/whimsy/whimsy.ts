import { Component } from '@angular/core';
import {
  BreadcrumbItem,
  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';
import { ProjectsLink } from '../../shared/projects-link/projects-link';

@Component({
  selector: 'app-whimsy',
  standalone: true,
  imports: [BreadcrumbsComponent, ProjectsLink],
  templateUrl: './whimsy.html',
  styleUrl: './whimsy.css',
})
export class Whimsy {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Whimsy', route: '/projects/whimsy' },
    { label: 'Overview' },
  ];

  readonly gallery = [
    {
      image: 'holiday',
      slug: 'holiday-in-the-halls',
      title: 'Holiday in the Halls',
      style: 'Festive illustration',
      description:
        'Cranberry red, pale mint, snowflakes, and gift illustrations frame a Christmas campaign. Promotional artwork sits beside the story of the live event, making the page feel like part of the celebration.',
      alt: 'Holiday in the Halls page with a Christmas photo collage, mint panels, snowflakes, and burgundy typography',
    },
    {
      image: 'harvest',
      slug: 'happy-harvest',
      title: 'Happy Harvest',
      style: 'Warm seasonal textures',
      description:
        'Ochre, cream, and deep brown set an autumn mood. Leaf and wheat drawings connect the page to its printed invitation, while vendor features give local makers space within the larger event story.',
      alt: 'Happy Harvest page with golden panels, leaf illustrations, warm brown headings, and an autumn vendor poster',
    },
    {
      image: 'valentines',
      slug: 'valentines-at-jackson-crossing',
      title: 'Valentine’s at Jackson Crossing',
      style: 'Playful romantic graphics',
      description:
        'Pink and red, heart motifs, and gift-focused imagery carry the occasion through the layout. The page connects individual offers to a shared seasonal reason to visit.',
      alt: 'Valentine’s at Jackson Crossing page with pink backgrounds, red accents, hearts, and a seasonal promotion',
    },
    {
      image: 'ingendahl',
      slug: 'ingendahl-acres-branding',
      title: 'Ingendahl Acres',
      style: 'Earthy brand storytelling',
      description:
        'Forest green, soft cream, sunflowers, and animal artwork create a very different atmosphere. Photographs of stickers in real settings show how a visual identity lives beyond the screen.',
      alt: 'Ingendahl Acres branding page with forest-green headings and a farm sticker photographed beside a sunflower',
    },
    {
      image: 'fetch',
      slug: 'fetch-market-launch',
      title: 'Fetch Market & Deli',
      style: 'Photography-led editorial',
      description:
        'Large food photographs, restrained colors, and generous spacing let the products lead. The page moves from a business introduction into sandwiches, pastries, desserts, and the place behind them.',
      alt: 'Fetch Market launch page pairing an editorial introduction with a large photograph of sandwiches',
    },
    {
      image: 'heavenly-bakes',
      slug: 'heavenly-bakes-and-cakes',
      title: 'Heavenly Bakes & Cakes',
      style: 'Colorful product promotion',
      description:
        'Cake and strawberry advertisements bring a more decorative, product-focused style into the collection. The layout gives the baker’s existing creative work a prominent place in the story.',
      alt: 'Heavenly Bakes and Cakes page presenting colorful custom-cake advertising and local business storytelling',
    },
    {
      image: 'humane-society',
      slug: 'cascades-ribbon-cutting',
      title: 'Cascades Humane Society',
      style: 'Warm community storytelling',
      description:
        'Animal portraits, gentle colors, and welcoming typography set the tone for a grand opening. Advertising and event photography connect a public invitation to the people and animals it supports.',
      alt: 'Cascades Humane Society page featuring a kitten portrait and a welcoming grand-opening story',
    },
    {
      image: 'team-hope',
      slug: 'team-hope-walk',
      title: 'Team Hope Walk',
      style: 'Purposeful awareness design',
      description:
        'Bold campaign graphics and a coordinated educational series share a clear visual language. Event details, awareness materials, and ways to help are organized around the same cause.',
      alt: 'Team Hope Walk page combining bold event artwork with coordinated awareness campaign graphics',
    },
  ];
}
