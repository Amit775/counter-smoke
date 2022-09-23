import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements AfterViewInit {
  @ViewChild(MatTabGroup) private tabs!: MatTabGroup;
  readonly phonePattern = '^05[0234789][0-9]{7}&';
  readonly codePattern = '^[0-9]{6}&';

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    this.authService.initVerifier();
  }

  sendSMS(phoneNumber: string): void {
    this.authService.sendSMS(phoneNumber).subscribe((success: boolean) => {
      if (success) {
        this.tabs._tabs.get(this.tabs.selectedIndex!)!.disabled = true;
        this.tabs._tabs.get(++this.tabs.selectedIndex!)!.disabled = false;
      }
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
