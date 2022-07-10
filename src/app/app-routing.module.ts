import { NoUserComponent } from './no-user/no-user.component';
import { RepoDetailsComponent } from './repo-details/repo-details.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent},
  { path: 'repositories', component: RepoListComponent},
  { path: 'repository-details', component: RepoDetailsComponent},
  { path: 'no-user', component: NoUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
