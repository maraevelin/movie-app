import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchListTableComponent } from './watch-list-table.component';

describe('WatchListTableComponent', () => {
  let component: WatchListTableComponent;
  let fixture: ComponentFixture<WatchListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
