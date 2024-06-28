import { ApiService } from './../api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  responseData: any;
  data = {
    password: '',
    repassword: '',
  };
  result: any;

  constructor(
    private navCtrl: NavController,
    private Router: Router,
    private toastCtrl: ToastController,
    private apiService: ApiService,
    private AlertController:AlertController
  ) {}

  ngOnInit() {
    this.showDataProfile();
  }

  showDataProfile () {
    const storedData = localStorage.getItem('data');
    if (storedData) {
        const userData = JSON.parse(storedData);
        const userId = userData.user?.id;

        if (userId) {
            this.apiService.showDataProfile(userId).subscribe({
                next: (res: any) => {
                    this.responseData = res;
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
        } else {
            console.error('User ID not found in stored data');
            this.presentToast('Silahkan Login untuk melanjutkan.');
            this.Router.navigate(['/login']);
        }
    } else {
        console.error('No stored data found');
        this.presentToast('Silahkan Login untuk melanjutkan.');
        this.Router.navigate(['/login']);
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

  submitForm() {
    const storedData = localStorage.getItem('data');
    if (storedData) {
        const userData = JSON.parse(storedData);
        const userId = userData.user?.id;
        let body: any;

        if (this.data.password !== this.data.repassword) {
          this.presentAlert('Password Tidak Sama!');
        } else {
          if (this.data.password === '') {
            body = {
              nama: this.responseData.data[0].nama,
              username: this.responseData.data[0].username,
              email: this.responseData.data[0].email,
              address: this.responseData.data[0].address,
              phone: this.responseData.data[0].phone
            };
          } else {
            body = {
              nama: this.responseData.data[0].nama,
              username: this.responseData.data[0].username,
              password: this.data.password,
              email: this.responseData.data[0].email,
              address: this.responseData.data[0].address,
              phone: this.responseData.data[0].phone
            };
          }

        }
        this.apiService.putDataProfile(userId, body).subscribe({
          next: () => {;
              this.presentToast('Update Data Berhasil !.');
              this.Router.navigate(['/home']);
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
  }

  logout() {
    this.apiService.logout().subscribe({
      next: () => {
        this.presentToast('Logout Berhasil !.');
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

}
