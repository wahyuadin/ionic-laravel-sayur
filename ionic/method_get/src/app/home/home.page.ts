import { ApiService } from './../api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  responseData: any;

  constructor(private router: Router, private apiService: ApiService) {
    this.responseData;
  }

  ngOnInit() {
    this.getDataFromAPI();
  }

  getDataFromAPI() {
    this.apiService.getData().subscribe(
      (response) => {
        this.responseData = response;
        console.log('Data from API:', this.responseData);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  goToDetailPage(id: number) {
    this.router.navigate(['detail', id]);
  }

}
