import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsHeaderComponent } from './channels-header.component';

describe('ChannelsHeaderComponent', () => {
  let component: ChannelsHeaderComponent;
  let fixture: ComponentFixture<ChannelsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
