import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs/breadcrumbs-component';
import { __decorate } from 'tslib';

let DiseaseDestroyer = class DiseaseDestroyer {
    breadcrumbs = [
        { label: 'Louie & Clara', route: 'projects/disease-destroyer' },
        { label: 'Overview' },
    ];
};
DiseaseDestroyer = __decorate([
    Component({
        selector: 'app-disease-destroyer',
        imports: [BreadcrumbsComponent],
        standalone: true,
        templateUrl: './disease-destroyer.html',
        styleUrl: './disease-destroyer.css',
    })
], DiseaseDestroyer);
export { DiseaseDestroyer };
