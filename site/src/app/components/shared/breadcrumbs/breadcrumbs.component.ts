import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass']
})
export class BreadcrumbsComponent {

  @Input() firstItem: string = '';
  @Input() search: boolean = false;
  @Input() secondaryItem: string = '';
  @Input() urlBack: string = '';

}
