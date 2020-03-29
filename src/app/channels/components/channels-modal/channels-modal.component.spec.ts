import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsModalComponent } from './channels-modal.component';

describe('ChannelsModalComponent', () => {
  let component: ChannelsModalComponent;
  let fixture: ComponentFixture<ChannelsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
