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
      decision: 'A dedicated campaign layout groups related assets into chapters, while shared navigation keeps the route back to the work collection familiar.',
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
      decision: 'A reusable image component reads stored dimensions and captions, preserving each asset’s proportions across a project-specific layout.',
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
      decision: 'Typed photo records keep source, caption, and dimensions together. A shared photo component supports different compositions without repeating the markup.',
      detail: 'Food photography · Opening event · Local business',
    },
  ];
}
