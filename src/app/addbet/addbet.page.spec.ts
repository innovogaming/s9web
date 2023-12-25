import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddbetPage } from './addbet.page';

describe('AddbetPage', () => {
  let component: AddbetPage;
  let fixture: ComponentFixture<AddbetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddbetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
