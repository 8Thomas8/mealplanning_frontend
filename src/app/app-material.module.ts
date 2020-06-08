import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';


const importExport = [MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatCardModule,
  MatSidenavModule, MatDividerModule, MatSelectModule, MatDatepickerModule, MatDatepickerModule, MatNativeDateModule, MatSliderModule];

@NgModule({
  imports: importExport,
  exports: importExport
})
export class AppMaterialModule {
}
