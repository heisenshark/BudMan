import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http'
import { TestBed } from '@angular/core/testing';
import { getRandomTrans } from '../mock-data'
import { Transaction } from '../Transaction'

import { UiService } from './ui.service';


describe('UiService', () => {
  let service: UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
