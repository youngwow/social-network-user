import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {LoginComponent} from "./pages/login/login.component";
import {FeedComponent} from "./pages/feed/feed.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {FriendsComponent} from "./pages/friends/friends.component";

const routes: Routes = [
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: RegistrationComponent},
  { path: 'profile', component: ProfilePageComponent},
  { path: 'feed', component: FeedComponent},
  { path: '', component: LoginComponent},
  { path: 'friends', component: FriendsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
