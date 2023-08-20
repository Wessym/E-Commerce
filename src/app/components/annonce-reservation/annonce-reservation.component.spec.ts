import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceReservationComponent } from './annonce-reservation.component';

describe('AnnonceReservationComponent', () => {
  let component: AnnonceReservationComponent;
  let fixture: ComponentFixture<AnnonceReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
