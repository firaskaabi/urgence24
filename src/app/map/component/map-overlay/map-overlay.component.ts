import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map-overlay',
  templateUrl: './map-overlay.component.html',
  styleUrls: ['./map-overlay.component.css']
})
export class MapOverlayComponent implements OnInit {
  @Input() modalTitle: string;
  @Input() modalText: string;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  close(event) {
    this.closeModal.emit(event);
  }
  

}
