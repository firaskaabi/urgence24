import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteprofessionnelComponent } from './compteprofessionnel.component';

describe('CompteprofessionnelComponent', () => {
  let component: CompteprofessionnelComponent;
  let fixture: ComponentFixture<CompteprofessionnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteprofessionnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteprofessionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
