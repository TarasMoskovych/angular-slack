import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsFormComponent } from './channels-form.component';

describe('ChannelsFormComponent', () => {
  let component: ChannelsFormComponent;
  let fixture: ComponentFixture<ChannelsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
