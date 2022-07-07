import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AgmCoreModule } from '@agm/core';

import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { AboutMainComponent } from "./about-pages/about-main/about-main.component";
import { AboutBlinComponent } from "./about-pages/about-blin/about-blin.component";
import { AboutJohnComponent } from "./about-pages/about-john/about-john.component";
import { AboutUmerComponent } from "./about-pages/about-umer/about-umer.component";
import { AboutAdnanComponent } from "./about-pages/about-adnan/about-adnan.component";
import { AboutDilipComponent } from "./about-pages/about-dilip/about-dilip.component";
import { BasicSearchComponent } from "./basic-search/basic-search.component";
import { HeaderComponent } from "./header/header.component";
import { EditProfileComponent } from "./dashboard-views/edit-profile/edit-profile.component";
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { MessagesComponent } from "./dashboard-views/messages/messages.component";
import { YourReviewsComponent } from "./dashboard-views/your-reviews/your-reviews.component";
import { YourRatingsComponent } from "./dashboard-views/your-ratings/your-ratings.component";
import { HistoryComponent } from "./dashboard-views/history/history.component";
import { ItemsSaleComponent } from "./dashboard-views/items-sale/items-sale.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { WishlistItemComponent } from "./wishlist/wishlist-item/wishlist-item.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { SearchResultsComponent } from "./search-results/search-results.component";
import { ResultsMenuComponent } from "./search-results/results-menu/results-menu.component";
import { ResultsItemComponent } from "./search-results/results-item/results-item.component";
import { ItemViewComponent } from "./item-view/item-view.component";
import { ItemCarouselComponent } from './item-view/item-carousel/item-carousel.component';
import { ItemDetailsComponent } from './item-view/item-details/item-details.component';
import { ItemSellerComponent } from './item-view/item-seller/item-seller.component';
import { ItemFeedbackComponent } from './item-view/item-feedback/item-feedback.component';
import { ItemLeaveFeedbackComponent } from './item-view/item-leave-feedback/item-leave-feedback.component';
import { AboutAleemComponent } from "./about-pages/about-aleem/about-aleem.component";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthGuard } from './services/auth.guard';
import { PostItemComponent } from './post-item/post-item.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartItemComponent } from './shopping-cart/cart-item/cart-item.component';
import { CartFinalizeComponent } from './shopping-cart/cart-finalize/cart-finalize.component';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HomeItemComponent } from './home/home-item/home-item.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './dashboard-views/settings/settings.component';
import { ConversationComponent } from './dashboard-views/messages/conversation/conversation.component';
import { MapComponent } from "./map/map.component";
import { LocationComponent } from './location/location.component';
import { HomeoneComponent } from './homeone/homeone.component';
import { HometwoComponent } from './hometwo/hometwo.component';
import { HomeMapComponent } from './home-map/home-map.component';
import { CheckOutComponent } from './payments/check-out/check-out.component';
import { PaymentMethodComponent } from './payments/payment-method/payment-method.component';
import { CheckoutCartComponent } from "./shopping-cart/checkout-cart/checkout-cart.component";
import { LocationTrackerComponent } from "./location-tracker/location-tracker.component";
import { CookInfoComponent } from './cook-info/cook-info.component';
//import { AgmCoreModule } from '@agm/core';


const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "post-item",
    component: PostItemComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "shopping-cart",
    component: ShoppingCartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "basic-search",
    component: BasicSearchComponent
  },
  {
    path: 'about-us',
    component: AboutMainComponent
  },
  {
    path: 'about',
    component: AboutMainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "about/adnan",
    component: AboutAdnanComponent
  },
  {
    path: "about/umer",
    component: AboutUmerComponent
  },
  {
    path: "about/blin",
    component: AboutBlinComponent
  },
  {
    path: "about/john",
    component: AboutJohnComponent
  },
  {
    path: "about/dilip",
    component: AboutDilipComponent
  },
  {
    path: "about/aleem",
    component: AboutAleemComponent
  },
  {
    path: "dashboard/edit-profile",
    component: EditProfileComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "dashboard/messages",
    component: MessagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard/messages/conversation",
    component: ConversationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard/your-reviews",
    component: YourReviewsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "dashboard/your-ratings",
    component: YourRatingsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "dashboard/history",
    component: HistoryComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "dashboard/items-sale",
    component: ItemsSaleComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "wishlist",
    component: WishlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "search-results",
    component: SearchResultsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'item-view',
    component: ItemViewComponent
  },
  {
    path: 'dashboard/settings',
    component: SettingsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'location',
    component: LocationComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'homeone',
    component: HomeoneComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'hometwo',
    component: HometwoComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'map',
    component: HomeMapComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'payments/check-out',
    component: CheckOutComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'payments/check-out/payment-method',
    component: PaymentMethodComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'checkout-cart',
    component: CheckoutCartComponent,
    // canActivate: [AuthGuard]
  },
  {
  path: 'location-tracker',
  component: LocationTrackerComponent
  },
  {
    path: 'cook-info',
    component: CookInfoComponent
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: HomeComponent
  },

 
];

@NgModule({
  declarations: [
    AppComponent,
    AboutMainComponent,
    AboutBlinComponent,
    AboutJohnComponent,
    AboutUmerComponent,
    AboutAdnanComponent,
    AboutDilipComponent,
    BasicSearchComponent,
    HeaderComponent,
    EditProfileComponent,
    SideMenuComponent,
    MessagesComponent,
    YourReviewsComponent,
    YourRatingsComponent,
    HistoryComponent,
    ItemsSaleComponent,
    WishlistComponent,
    WishlistItemComponent,
    SearchBarComponent,
    SearchResultsComponent,
    ResultsMenuComponent,
    ResultsItemComponent,
    ItemViewComponent,
    AboutAleemComponent,
    LoginComponent,
    RegisterComponent,
    ItemCarouselComponent,
    ItemDetailsComponent,
    ItemSellerComponent,
    ItemFeedbackComponent,
    ItemLeaveFeedbackComponent,
    PostItemComponent,
    ShoppingCartComponent,
    CartItemComponent,
    CartFinalizeComponent,
    HomeComponent,
    AdminPanelComponent,
    HomeItemComponent,
    FooterComponent,
    SettingsComponent,
    ConversationComponent,
    MapComponent,
    LocationComponent,
    HomeoneComponent,
    HometwoComponent,
    HomeMapComponent,
    CheckOutComponent,
    PaymentMethodComponent,
    CheckoutCartComponent,
    LocationTrackerComponent,
    CookInfoComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only (set true)
    ),
    // AgmCoreModule.forRoot({
    //   apiKey: 'GOOGLEAPIKEY'
    // }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}




