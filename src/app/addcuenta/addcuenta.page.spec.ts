import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddcuentaPage } from './addcuenta.page';

describe('AddcuentaPage', () => {
  let component: AddcuentaPage;
  let fixture: ComponentFixture<AddcuentaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddcuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
