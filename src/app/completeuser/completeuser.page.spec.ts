import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteuserPage } from './completeuser.page';

describe('CompleteuserPage', () => {
  let component: CompleteuserPage;
  let fixture: ComponentFixture<CompleteuserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompleteuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
