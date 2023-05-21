import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
// college\src\app\home\home.component.spec.ts
import { StudentDetailsComponent } from './student-details/student-details.component';


// const routes: Routes = [];
const routes: Routes = [
  { path: '', component: HomeComponent }, // Home route
  { path: 'student', component: StudentComponent }, // Student route
  { path: 'admin', component: AdminComponent },
  {path: 'student-details/:requestId', component: StudentDetailsComponent},
];// routing module.ts

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
