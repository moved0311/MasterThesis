import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NGfooterComponent } from './footer.component';
import { FooterPageComponent } from './footerpage.component';
import { ImgPageComponent } from './imgpage.component';
import { DatapageComponent } from './datapage/datapage.component';
import { JSONTreeComponent } from './datapage/jsonTree.component';
import { JsavpageComponent } from './jsavpage/jsavpage.component';
import { MappageComponent } from './mappage/mappage.component';
import { W3CSSTablePageComponent } from './w3-csstable-page/w3-csstable-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/footer', pathMatch: 'full' },
  { path: 'footer', component: FooterPageComponent},
  { path: 'imgpage', component: ImgPageComponent},
  { path: 'datapage', component: DatapageComponent},
  { path: 'jsontable', component: JSONTreeComponent},
  { path: 'jsavpage', component: JsavpageComponent},
  { path: 'mappage', component: MappageComponent},
  { path: 'W3CSSTable', component: W3CSSTablePageComponent}
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
