import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../api.service';
import { NavController, ToastController } from '@ionic/angular';

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
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    this.fetchData(+id);
  }

  ionViewWillEnter() {
    const id: string = this.route.snapshot.params['id'];
    this.fetchData(+id);
  }

  async fetchData(id: number) {
    try {
      this.responseData = await this.apiService.detailData(id).toPromise();
      console.log(this.responseData[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
      this.presentToast('Error fetching data.');
    }
  }

  async addItemToCart() {
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

    try {
      this.responsePost = await this.apiService.postDatacart(data).toPromise();
      this.presentToast('Data Berhasil Masuk Keranjang');
      this.navCtrl.navigateForward('/cart');
    } catch (error: any) {
      if (error.status === 401) {
        this.presentToast('Untuk Melanjutkan Silahkan Login.');
        this.router.navigate(['/login']);
      } else {
        console.error('Error adding item to cart:', error);
        this.presentToast('Error adding item to cart.');
      }
    }
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
