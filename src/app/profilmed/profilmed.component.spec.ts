import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilmedComponent } from './profilmed.component';

describe('ProfilmedComponent', () => {
  let component: ProfilmedComponent;
  let fixture: ComponentFixture<ProfilmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilmedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
