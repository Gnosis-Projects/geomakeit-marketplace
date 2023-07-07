import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {

  private jwtStatus = new BehaviorSubject<boolean>(false);

  public jwtStatus$: Observable<boolean> = this.jwtStatus.asObservable();

  constructor() { }

  setJwtStatus(status: boolean) {
    this.jwtStatus.next(status);
  }
}
