import { ApiService } from './../../api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  nama: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private apiService: ApiService,
    private Router: Router
  ) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.presentToast('Konfirmasi password tidak cocok.');
      return;
    }

    let body = {
      'username': this.nama,
      'email': this.email,
      'password': this.password,
    }
    this.apiService.register(body).subscribe({
      next: () => {
        this.presentToast('Berhasil mendaftar. Silakan login.');
        this.Router.navigate(['/login']);
      },
      error: (error) => {
          if (error.status === 401) {
              this.presentToast('Silahkan Login untuk melanjutkan.');
              this.Router.navigate(['/login']);
          } else {
              console.error('Error fetching data from cart:', error);
          }
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
