import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarPage } from './validar.page';

describe('ValidarPage', () => {
  let component: ValidarPage;
  let fixture: ComponentFixture<ValidarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ValidarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
