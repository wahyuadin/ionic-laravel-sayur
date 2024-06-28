import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PesananPage } from './pesanan.page';

describe('PesananPage', () => {
  let component: PesananPage;
  let fixture: ComponentFixture<PesananPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PesananPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
