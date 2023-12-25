import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BetPage } from './bet.page';

describe('BetPage', () => {
  let component: BetPage;
  let fixture: ComponentFixture<BetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
