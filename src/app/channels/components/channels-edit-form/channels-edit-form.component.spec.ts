import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsEditFormComponent } from './channels-edit-form.component';

describe('ChannelsEditFormComponent', () => {
  let component: ChannelsEditFormComponent;
  let fixture: ComponentFixture<ChannelsEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelsEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
