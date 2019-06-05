import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
//rounting
import { AppRoutingModule } from './app-routing.module';
// component
import { AppComponent } from './app.component';
import { NGfooterComponent } from './footer.component';
import { FooterPageComponent } from './footerpage.component';
import { ImgPageComponent } from './imgpage.component';
import { NGImgSlideComponent } from './imgSlide.component';
import { DatapageComponent } from './datapage/datapage.component';
import { JSONTreeComponent } from './datapage/jsonTree.component';
import { TreeViewComponent } from './datapage/tree-view.component';
import { JsavpageComponent } from './jsavpage/jsavpage.component';
import { JsavarrComponent } from './jsavpage/jsavarr/jsavarr.component';
// import { JSAVArrayRandomComponent } from './jsavpage/jsavArrRandom.component';
import { MappageComponent } from './mappage/mappage.component';
import { ZipmapcodeComponent } from './mappage/zipmapcode/zipmapcode.component';
import { JsavBinarySearchComponent } from './jsavpage/jsav-binary-search/jsav-binary-search.component';
import { ObjectEditerComponent } from './datapage/object-editer/object-editer.component';
import { W3CSSTableComponent } from './w3-csstable-page/w3-csstable/w3-csstable.component';
import { W3CSSTablePageComponent } from './w3-csstable-page/w3-csstable-page.component';
import { PopulationmapComponent } from './mappage/populationmap/populationmap.component';

@NgModule({
  declarations: [
    AppComponent,
    NGfooterComponent,
    FooterPageComponent,
    ImgPageComponent,
    NGImgSlideComponent,
    DatapageComponent,
    JSONTreeComponent,
    TreeViewComponent,
    JsavpageComponent,
    JsavarrComponent,
    MappageComponent,
    ZipmapcodeComponent,
    JsavBinarySearchComponent,
    ObjectEditerComponent,
    W3CSSTableComponent,
    W3CSSTablePageComponent,
    PopulationmapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
