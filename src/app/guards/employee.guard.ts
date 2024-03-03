import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataServicesService } from '../services/data-services.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(private dataService: DataServicesService, private router: Router, private location: Location){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.dataService.get('currentUser','session');
    if(isLoggedIn[0].role.toLowerCase() === 'employee') {
      return true;
    } else {
      this.location.back();
      // this.router.navigate(['/log-in'])
      return false;
    }
  }

}
