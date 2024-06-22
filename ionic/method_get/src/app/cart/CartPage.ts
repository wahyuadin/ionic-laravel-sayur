import { Component, OnInit } from '@angular/core';
import { CartService } from './../cart.service';
import { Observable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { InterfaceCart } from './interface-cart';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage{
  responseData: any;
  cartItem$!: Observable<InterfaceCart[]>;
  totalAmount$!: Observable<number>;

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private toastCtrl: ToastController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.showData();
    console.log(this.responseData)

    this.cartItem$ = this.cartService.getCart();
    this.totalAmount$ = this.cartService.getTotalAmount();
  }

  showData() {
    const storedData = localStorage.getItem('data');
    if (storedData) {
        const userData = JSON.parse(storedData);
        const userId = userData.user?.id;

        if (userId) {
            this.apiService.showDataCart(userId).subscribe({
                next: (res: any) => {
                    this.responseData = res;
                    console.log(this.responseData);
                },
                error: (error) => {
                    if (error.status === 401) {
                        this.presentToast('Silahkan Login untuk melanjutkan.');
                        this.router.navigate(['/login']);
                    } else {
                        console.error('Error fetching data from cart:', error);
                    }
                }
            });
        } else {
            console.error('User ID not found in stored data');
            this.presentToast('Silahkan Login untuk melanjutkan.');
            this.router.navigate(['/login']);
        }
    } else {
        console.error('No stored data found');
        this.presentToast('Silahkan Login untuk melanjutkan.');
        this.router.navigate(['/login']);
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
