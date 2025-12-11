import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActifsDigitauxComponent } from './actifs-digitaux.component';

describe('ActifsDigitauxComponent', () => {
  let component: ActifsDigitauxComponent;
  let fixture: ComponentFixture<ActifsDigitauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActifsDigitauxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActifsDigitauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
