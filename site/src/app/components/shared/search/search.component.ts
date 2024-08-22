import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {

  constructor(private router: Router){}

  search(e: any, value: any){
    console.log(value);
    if(e.code == 'Enter'){
      this.router.navigate(['/resultados'], { queryParams: {'item': value} });
    }
  }

}
