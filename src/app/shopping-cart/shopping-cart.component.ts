import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  localsotrageitem;
  success: string = null;
  error: string = null;
  constructor(private CartService: CartService, private Router: Router) { }

  ngOnInit() {
    this.getitems();
  }
  getitems(){
    this.localsotrageitem = JSON.parse(localStorage.getItem('cart'));
  }
 
}