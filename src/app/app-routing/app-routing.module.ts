import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMainComponent } from '../about-pages/about-main/about-main.component';
import { EditProfileComponent } from '../dashboard-views/edit-profile/edit-profile.component';
import { LocationComponent } from '../location/location.component';

const routes: Routes = [
    {
        path: '',
        component: AboutMainComponent,
    },
    {
        path: 'dashboard/edit-profile',
        component: EditProfileComponent
    },
    // {
    //     path: 'location',
    //     component: LocationComponent
    // },
  
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }