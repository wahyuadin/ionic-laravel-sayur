import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessPage } from './success.page';

describe('SuccessPage', () => {
  let component: SuccessPage;
  let fixture: ComponentFixture<SuccessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
