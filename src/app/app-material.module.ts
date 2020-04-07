import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
const importExport = [MatButtonModule]

@NgModule({
  imports: importExport,
  exports: importExport
})
export class AppMaterialModule { }
