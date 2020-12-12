import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StroopGamePage } from './stroop-game.page';

describe('StroopGamePage', () => {
  let component: StroopGamePage;
  let fixture: ComponentFixture<StroopGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StroopGamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StroopGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
