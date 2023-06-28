import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/interfaces/settings.interface';
import { SettingsService } from './services/settings.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public settings: Settings | any;
  public formGroup: FormGroup = new FormGroup({});

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
      this.settingsService.getMySettings()
        .subscribe(res => {
          this.settings = res.settings;
        });
  }

  onSubmit() {
    
  }
}
