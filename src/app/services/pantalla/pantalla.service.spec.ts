import { TestBed, inject } from '@angular/core/testing';

import { PantallaService } from './pantalla.service';

describe('PantallaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PantallaService]
    });
  });

  it('should be created', inject([PantallaService], (service: PantallaService) => {
    expect(service).toBeTruthy();
  }));
});
