import { ApiService } from './../../api.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';

interface LoginResponse {
  token: string;
  data: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  responseData: any;
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private ApiService:ApiService
  ) {
    const storedData = localStorage.getItem('data');
    if (storedData) {
      this.ApiService.cekSesi().subscribe({
        next: (res: any) => {
          this.responseData = res;
          console.log(this.responseData)
          this.navCtrl.navigateRoot('/profile');
        },
        error: (error) => {
          if (error.status === 401) {
              console.log('Show login form');
          } else {
              console.error('show login form');
          }
        }
      })
    }
  }

  async login() {
    if (!this.email || !this.password) {
      const alert = await this.alertController.create({
        header: 'Gagal',
        message: 'Username atau password wajib diisi!',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    const loginData = {
      email: this.email,
      password: this.password
    };

    const url = 'http://127.0.0.1:8000/api/auth/login';

    try {
      const response = await this.http.post<LoginResponse>(url, loginData).toPromise();
        if (response && response.token && response.data) {
          localStorage.setItem('data', JSON.stringify({
            user: response.data[0],
            token: response.token
          }));
        }

        if (response && response.token && response.data) {
          this.presentToast('Login Berhasil')
          this.navCtrl.navigateRoot('/home');
        }
    } catch (error) {
      console.error('Login error', error);
      this.presentAlert('Username atau password salah');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Pringatan',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
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

  goBack() {
    this.router.navigate(['/']);
  }

  showData() {
    const storedData = localStorage.getItem('data');
    if (storedData) {
        const userData = JSON.parse(storedData);
        const userId = userData.user?.id;

        if (userId) {
            this.ApiService.showDataCart(userId).subscribe({
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
}
