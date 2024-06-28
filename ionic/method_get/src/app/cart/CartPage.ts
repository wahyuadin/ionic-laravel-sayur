import { Component } from '@angular/core';
import { CartService } from './../cart.service';
import { Observable } from 'rxjs';
import { ToastController, AlertController } from '@ionic/angular';
import { InterfaceCart } from './interface-cart';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage{
  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
  responseData: any;
  responseDataUser: any;
  responsePutProfile: any;
  responsePostOrder: any;
  cartItem$!: Observable<InterfaceCart[]>;
  totalAmount$!: Observable<number>;

  constructor(
    private cartService: CartService,
    private AlertController: AlertController,
    private apiService: ApiService,
    private toastCtrl: ToastController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.showData();

    this.cartItem$ = this.cartService.getCart();
    this.totalAmount$ = this.cartService.getTotalAmount();
  }

  ionViewWillEnter() {
    this.showData();
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

  async presentAlert(message: string) {
    const alert = await this.AlertController.create({
      header: 'Peringatan',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  Cekout() {
    const storedData = localStorage.getItem('data');
    if (storedData) {
        const userData = JSON.parse(storedData);
        const userId = userData.user?.id;
        this.apiService.showDataProfile(userId).subscribe({
          next: (res: any) => {
              this.responseDataUser = res;
              const data = {
                "user_id": this.responseData[0]['users_id'],
              }

              console.log(this.responseData)

              if (this.responseDataUser['data'][0]['address']) {
                this.apiService.postDataOrder(data).subscribe({
                    next: (res: any) => {
                      this.responsePostOrder = res;
                      this.apiService.wa(userData.user?.phone).subscribe({
                        next: (res : any) => {
                          console.log(res)
                          this.presentAlert('Berhasil Di Cekout!');
                          this.router.navigate(['/cart/success']);
                        }
                      })
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
                this.presentAlert('Lengkapi Profile Terlebih dahulu');
                this.router.navigate(['/profile']);
              }
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
    }
  }
}
