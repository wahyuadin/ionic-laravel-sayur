import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  nama: string = ''; // Inisialisasi dengan nilai awal kosong
  username: string = ''; // Inisialisasi dengan nilai awal kosong
  email: string = ''; // Inisialisasi dengan nilai awal kosong
  password: string = ''; // Inisialisasi dengan nilai awal kosong
  confirmPassword: string = ''; // Inisialisasi dengan nilai awal kosong

  constructor(
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  register() {
    // Validasi password
    if (this.password !== this.confirmPassword) {
      this.presentToast('Konfirmasi password tidak cocok.');
      return;
    }

    // Implementasi logika registrasi (contoh sederhana)
    console.log('Nama:', this.nama);
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Contoh: Redirect ke halaman login setelah registrasi sukses
    this.router.navigate(['/login']);
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
