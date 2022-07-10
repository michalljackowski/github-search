import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoUserComponent } from './no-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('NoUserComponent', () => {
  let component: NoUserComponent;
  let fixture: ComponentFixture<NoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:  [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ NoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
