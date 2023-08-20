import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesTableComponent } from './annonces-table.component';

describe('AnnoncesTableComponent', () => {
  let component: AnnoncesTableComponent;
  let fixture: ComponentFixture<AnnoncesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoncesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoncesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
