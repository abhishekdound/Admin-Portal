import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOptionsList } from './header-options-list';

describe('HeaderOptionsList', () => {
  let component: HeaderOptionsList;
  let fixture: ComponentFixture<HeaderOptionsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderOptionsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderOptionsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
