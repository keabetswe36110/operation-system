import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { AdminLandingComponent } from './components/admin-landing/admin-landing.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LandingComponent } from './components/landing/landing.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { PolicyFormComponent } from './popUps/policy-form/policy-form.component';
import { EmployeeLandingComponent } from './components/employee-landing/employee-landing.component';
import { AdminAsEmployeeComponent } from './components/admin-as-employee/admin-as-employee.component';
import { OperationLandingComponent } from './components/operation-landing/operation-landing.component';
import { ManagerLandingComponent } from './components/manager-landing/manager-landing.component';
import { OperatorsLandingComponent } from './components/operators-landing/operators-landing.component';
import { EmployeeGuard } from './guards/employee.guard';

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },// redirect to `first-component`
  { path: 'landing', component: LandingComponent, children: [
    { path: 'all-users', component: AllUsersComponent },
    { path: 'policies', component: PoliciesComponent ,children:[{ path: 'policy-form', component: PolicyFormComponent }]},
    
  ]
},
  { path: 'log-in', component: LogInComponent },
  { path: 'admin-landing', component: AdminLandingComponent },
  { path: 'employee-landing', component: EmployeeLandingComponent, canActivate: [EmployeeGuard] },
  { path: 'admin-as-employee', component: AdminAsEmployeeComponent },
  { path: 'operation-landing', component: OperationLandingComponent },
  { path: 'manager-landing', component: ManagerLandingComponent },
  { path: 'operators-landing', component: OperatorsLandingComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
