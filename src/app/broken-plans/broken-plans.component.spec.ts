import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokenPlansComponent } from './broken-plans.component';

describe('BrokenPlansComponent', () => {
  let component: BrokenPlansComponent;
  let fixture: ComponentFixture<BrokenPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokenPlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrokenPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
