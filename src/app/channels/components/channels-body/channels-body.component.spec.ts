import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsBodyComponent } from './channels-body.component';

describe('ChannelsBodyComponent', () => {
  let component: ChannelsBodyComponent;
  let fixture: ComponentFixture<ChannelsBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelsBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
