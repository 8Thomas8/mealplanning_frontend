import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';


const importExport = [MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatCardModule];

@NgModule({
  imports: importExport,
  exports: importExport
})
export class AppMaterialModule {
}
