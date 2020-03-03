import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelUserUpdateComponent } from './side-panel-user-update.component';

describe('SidePanelUserUpdateComponent', () => {
  let component: SidePanelUserUpdateComponent;
  let fixture: ComponentFixture<SidePanelUserUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePanelUserUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
