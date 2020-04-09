import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';


const importExport = [MatButtonModule, MatToolbarModule, MatIconModule];

@NgModule({
  imports: importExport,
  exports: importExport
})
export class AppMaterialModule {
}
