import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthProvider} from '../../providers/auth';
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger(
      'login', [
        transition(':enter', [
          style({
            opacity: 0
          }),
          animate("1s ease-in-out", style({
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
            opacity: 0
          })
        ])
      ],
    ),
    trigger(
      'register', [
        transition(':enter', [
          style({
            opacity: 0
          }),
          animate("1s ease-in-out", style({
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
            opacity: 0
          })
        ])
      ],
    ),
  ]

})
export class LoginPage implements OnInit {
  loading;
  login = true;
  register = false;
  loginForm = {
    email: '',
    password: ''
  }

  registerForm = {
    name: '',
    email: '',
    password: ''
  }

  constructor(
    private authProvider: AuthProvider,
    private firebaseProvider: FirebaseProvider,
    private loadingController: LoadingController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  showSignup() {
    this.login = false;
    this.register = true;
  }

  showLogin() {
    this.login = true;
    this.register = false;
  }

  authenticate() {
    this.presentLoading();

    this.authProvider.login(this.loginForm)
    .then((res) => {
      console.log(res);
      this.router.navigate(['/home']);
    })
    .catch((err) => {
    })
  }

  createUser() {
    this.presentLoading();

    this.authProvider.register(this.registerForm)
    .then((res) => {
      let uid = res.user.uid;

      let data = {
        uid: uid,
        name: this.registerForm.name,
        email: this.registerForm.email
      }

      this.firebaseProvider.postUser(data)
      .then((res) => {
      })
      .catch((err) => {
      })
    })
    .catch((err) => {
    })
  }


}
