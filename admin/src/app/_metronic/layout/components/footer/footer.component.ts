import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import {environment} from "../../../../../environments/environment";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  NAME_APP = environment.NAME_APP;
  footerContainerCssClasses: string = '';
  currentDateStr: string = new Date().getFullYear().toString();

  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.footerContainerCssClasses =
      this.layout.getStringCSSClasses('footerContainer');
  }
}
