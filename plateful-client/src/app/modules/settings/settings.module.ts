import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SharedModule } from 'src/app/components/shared.module';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SettingsComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,
        MatSlideToggleModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [SettingsComponent],
})
export class SettingsModule {}