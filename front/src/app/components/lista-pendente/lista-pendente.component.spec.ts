import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPendenteComponent } from './lista-pendente.component';

describe('ListaPendenteComponent', () => {
  let component: ListaPendenteComponent;
  let fixture: ComponentFixture<ListaPendenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPendenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
