import { TestBed } from '@angular/core/testing';

import { MapOverlayServiceService } from './map-overlay-service.service';

describe('MapOverlayServiceService', () => {
  let service: MapOverlayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapOverlayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
