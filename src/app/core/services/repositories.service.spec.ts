import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RepositoriesService } from './repositories.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RepositoriesService', () => {
  let service: RepositoriesService;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(RepositoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
