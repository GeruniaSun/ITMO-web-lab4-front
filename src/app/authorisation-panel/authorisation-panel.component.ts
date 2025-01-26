import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-authorisation-panel',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './authorisation-panel.component.html',
  standalone: true,
  styleUrl: './authorisation-panel.component.sass'
})

export class AuthorisationPanelComponent {
  isLoginMode = true;
  loginError = false;
  registrError = false;

  formData = {
    login: '',
    password: '',
    confirmPassword: '',
  };

  selectMode(mode: 'login' | 'register'): void {
    this.isLoginMode = mode === 'login';
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      login: '',
      password: '',
      confirmPassword: '',
    };
    this.hideErrors()
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      console.log('Авторизация:', this.formData);
      this.authFetch("login");
    } else {
      if (this.formData.password !== this.formData.confirmPassword) {
        //alert('Пароли не совпадают!');
        return;
      }
      console.log('Регистрация:', this.formData);
      this.authFetch("register");
    }
  }

  private authFetch(mode: String): void {
    let requestContent = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.formData.login,
        pass: this.formData.password,
      }),
    };

    fetch("http://localhost:8080/auth/" + mode, requestContent).then(response => {
      if (response.ok) {
        response.json().then((data) => {
          if (data.token) {
            localStorage.setItem("jwt", data.token);
            this.hideErrors()
            window.location.href = '/main'
          }
        });
      } else if(response.status !== 400 && mode === "login") this.loginError = true
      else  if(response.status !== 400 && mode === "register") this.registrError = true
    }).catch(() => {
      alert("Ошибка подключения к серверу");
    });
  }

  private hideErrors() {
    this.registrError = false
    this.loginError = false
  }
}
