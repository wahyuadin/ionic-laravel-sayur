import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  responseData: any;
  responsePost: any;


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastCtrl: ToastController,
    private router: Router,
  ) {}

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    this.showData(+id);
  }

  showData(id: number) {
    this.apiService.detailData(id).subscribe(
      (response) => {
        this.responseData = response;
        console.log(this.responseData[0]);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  addItemToCart() {
    const storedData = localStorage.getItem('data');
    if (!storedData) {
        this.presentToast('Untuk Melanjutkan Silahkan Login.');
        this.router.navigate(['/login']);
        return;
    }

    let userId: number;
    try {
        const parsedData = JSON.parse(storedData);
        userId = parsedData.user.id;
    } catch (error) {
        this.presentToast('Error parsing stored data.');
        console.error('Error parsing stored data:', error);
        return;
    }

    const data = {
        users_id: userId,
        products_id: this.route.snapshot.params['id'],
        quantiti: '1'
    };

    this.apiService.postDatacart(data).subscribe({
        next: (response) => {
            this.responsePost = response;
            console.log(this.responsePost);
            this.presentToast('Data Berhasil Masuk Keranjang');
        },
        error: (error) => {
            if (error.status === 401) {
                this.presentToast('Untuk Melanjutkan Silahkan Login.');
                this.router.navigate(['/login']);
            } else {
                console.error('Error adding item to cart:', error);
                this.presentToast('Error adding item to cart.');
            }
        }
    });
}



  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      mode: 'ios',
      duration: 2000,
      position: 'top',
    });

    toast.present();
  }
}
