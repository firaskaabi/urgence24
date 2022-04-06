import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './component/map.component';
import { MapOverlayComponent } from './component/map-overlay/map-overlay.component';
import { BrowserModule } from '@angular/platform-browser';
import { MapViewComponent } from './component/map-view/map-view.component';

@NgModule({
  declarations: [MapComponent, MapOverlayComponent, MapViewComponent],
  imports: [
    CommonModule,
    BrowserModule,
  ]
})
export class MapModule { }
