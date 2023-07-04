import { Component, OnInit } from "@angular/core";
import { Settings } from "src/app/interfaces/settings.interface";
import { SettingsService } from "./services/settings.service";
import { FormGroup, UntypedFormControl } from "@angular/forms";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  public settings: Settings | any;
  public formGroup: FormGroup = new FormGroup({});

  constructor(private settingsService: SettingsService) {
    this.settingsService.getMySettings().subscribe((res) => {
      this.settings = res;
      this.formGroup.addControl("phone", new UntypedFormControl(""));
      this.formGroup.addControl("notifications", new UntypedFormControl(""));
      this.formGroup.addControl("email", new UntypedFormControl(""));

      this.initFormControlValues();
    });
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((control) => {
      console.log(control);
    });
  }

  onSubmit() {
    console.log(this.settings);

    this.settingsService.patchMySettings(this.settings).subscribe((res) => {
      this.settings = res;
    });
  }

  private initFormControlValues(): void {
    if (this.settings) {
      this.formGroup.get("email")?.setValue(this.settings.showEmail);
      this.formGroup.get("phone")?.setValue(this.settings.showPhone);
      if (this.settings.pushSubscription) {
        this.formGroup.get("notifications")?.setValue(true);
      } else {
        this.formGroup.get("notifications")?.setValue(false);
      }
    }
  }

  public onToggle(controlName: string, event: MatSlideToggleChange) {
    this.formGroup.get(controlName)?.setValue(event.checked);

    switch (controlName) {
      case "email":
        this.settings.showEmail = event.checked;
        break;
      case "phone":
        this.settings.showPhone = event.checked;
        break;
    }
  }
}
