import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationDeLeadsComponent } from './generation-de-leads.component';

describe('GenerationDeLeadsComponent', () => {
  let component: GenerationDeLeadsComponent;
  let fixture: ComponentFixture<GenerationDeLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerationDeLeadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerationDeLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
