import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsWebMobileComponent } from './apps-web-mobile.component';

describe('AppsWebMobileComponent', () => {
  let component: AppsWebMobileComponent;
  let fixture: ComponentFixture<AppsWebMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsWebMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsWebMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
