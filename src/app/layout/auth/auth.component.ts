import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements AfterViewInit {
  @ViewChild(MatTabGroup) private tabs!: MatTabGroup;
  @ViewChild('phone') private phone!: HTMLInputElement;
  @ViewChild('code') private code!: HTMLImageElement;

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    this.authService.initVerifier();
  }

  sendSMS(phoneNumber: string): void {
    this.authService.sendSMS(phoneNumber).subscribe(() => {
      this.tabs._tabs.get(this.tabs.selectedIndex!)!.disabled = true;
      this.tabs._tabs.get(++this.tabs.selectedIndex!)!.disabled = false;
    });
  }

  verifyCode(code: string): void {
    this.authService.verifyCode(code).subscribe();
  }

  setTestPhone(): void {
    this.sendSMS('0521234567');
  }

  setTestCode(): void {
    this.verifyCode('123456');
  }
}
