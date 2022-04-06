import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParapharmacieComponent } from './parapharmacie.component';

describe('ParapharmacieComponent', () => {
  let component: ParapharmacieComponent;
  let fixture: ComponentFixture<ParapharmacieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParapharmacieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParapharmacieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
