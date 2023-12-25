import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditbetPage } from './editbet.page';

describe('EditbetPage', () => {
  let component: EditbetPage;
  let fixture: ComponentFixture<EditbetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditbetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
