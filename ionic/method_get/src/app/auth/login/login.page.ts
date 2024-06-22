import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

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
      // Redirect ke halaman home jika login berhasil
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
    this.router.navigate(['/']); // Ganti '/' dengan rute tujuan kembali
  }
}
