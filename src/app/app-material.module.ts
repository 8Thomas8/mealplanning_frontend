import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';


const importExport = [MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule];

@NgModule({
  imports: importExport,
  exports: importExport
})
export class AppMaterialModule {
}
