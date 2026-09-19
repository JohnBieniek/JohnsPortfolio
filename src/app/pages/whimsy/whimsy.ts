import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  BreadcrumbItem,
  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-whimsy',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './whimsy.html',
  styleUrl: './whimsy.css',
})
export class Whimsy {
  constructor() {
    const viewportScroller = inject(ViewportScroller);
    const document = inject(DOCUMENT);
    // Angular's anchor scroller needs an explicit offset for the sticky header.
    viewportScroller.setOffset(() => [
      0,
      (document.querySelector('.site-header')?.getBoundingClientRect().height ?? 76) + 24,
    ]);
    inject(DestroyRef).onDestroy(() => viewportScroller.setOffset([0, 0]));
  }

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Whimsy', route: '/projects/whimsy' },
    { label: 'Overview' },
  ];

  readonly selectedExample = signal(0);
  readonly examples = [
    {
      title: 'Seasonal campaigns',
      project: 'Holiday in the Halls',
      image: 'holiday',
      artwork: 'campaign-art',
      alt: 'Holiday in the Halls page pairing event photographs with cranberry headings and mint panels',
      artworkAlt: 'Holiday in the Halls campaign artwork with event photography and a red holiday invitation',
      slug: 'holiday-in-the-halls',
      description: 'The campaign ties together the public invitation, individual partner spotlights, and photography from the event itself. Cranberry, mint, and seasonal illustrations connect the pieces.',
      decisionTitle: 'Build the campaign as a sequence',
      decision: 'The page moves from the public invitation to individual partner spotlights, then closes with photographs from the event. That order shows how one visual campaign carried through promotion and into the real experience.',
      detail: 'Campaign artwork · Partner spotlights · Event coverage',
    },
    {
      title: 'Business identities',
      project: 'Ingendahl Acres',
      image: 'ingendahl',
      artwork: 'farm-identity',
      alt: 'Ingendahl Acres page with forest-green typography, farm branding, and sticker photography',
      artworkAlt: 'Ingendahl Acres farm-logo sticker with a sunset and cow silhouette, photographed on straw',
      slug: 'ingendahl-acres-branding',
      description: 'Logos and sticker artwork place the farm’s identity in its real-world setting. Forest green, cream, and real textures connect the digital presentation to the business behind it.',
      decisionTitle: 'Let each piece keep its shape',
      decision: 'Wide logos, circular stickers, and field photography should not be forced into identical cards. The layout gives each format its own space, while stored dimensions and captions keep the images proportionate and accessible at every resolution.',
      detail: 'Visual identity · Printed pieces · Photography',
    },
    {
      title: 'Food & local stories',
      project: 'Fetch Market & Deli',
      image: 'fetch',
      artwork: 'food-photography',
      alt: 'Fetch Market launch page with an editorial introduction and a large photograph of sandwiches',
      artworkAlt: 'Five-cheese and spinach Spankies pastries at Fetch Market & Deli',
      slug: 'fetch-market-launch',
      description: 'Food, place, and people lead the page. Large photographs move the story from the storefront and opening event to the dishes visitors can expect to find.',
      decisionTitle: 'Let the food lead the story',
      decision: 'Instead of shrinking the work into a uniform gallery, the layout gives the photography room to sell the experience. The sequence moves from the storefront and opening-day crowd to close-ups of the menu, with typed photo records preserving captions, dimensions, and loading behavior.',
      detail: 'Food photography · Opening event · Local business',
    },
  ];
}
