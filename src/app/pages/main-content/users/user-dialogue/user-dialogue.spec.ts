import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogue } from './user-dialogue';

describe('UserDialogue', () => {
  let component: UserDialogue;
  let fixture: ComponentFixture<UserDialogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDialogue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDialogue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
