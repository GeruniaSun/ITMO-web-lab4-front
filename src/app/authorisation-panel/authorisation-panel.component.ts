import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-authorisation-panel',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './authorisation-panel.component.html',
  standalone: true,
  styleUrl: './authorisation-panel.component.sass'
})

export class AuthorisationPanelComponent {
  isLoginMode = true;

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
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      console.log('Авторизация:', this.formData);
    } else {
      if (this.formData.password !== this.formData.confirmPassword) {
        alert('Пароли не совпадают!');
        return;
      }
      console.log('Регистрация:', this.formData);
    }
  }
}
