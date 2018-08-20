import { CartItem } from './../models/cart-item';
import { Order } from './../models/order';
import { AppConst } from './../constants/app-const';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckoutService } from './../services/checkout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private order: Order = new Order();
  private estimatedDeliveryDate: string;
  private cartItemList: CartItem[] = [];

  constructor(private checkoutService: CheckoutService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.order = JSON.parse(params['order']);

      let deliveryDate = new Date();
      if (this.order.shippingMethod == "groundShipping") {
        deliveryDate.setDate(deliveryDate.getDate() + 5);
      } else {
        deliveryDate.setDate(deliveryDate.getDate() + 2);
      }
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      this.estimatedDeliveryDate = days[deliveryDate.getDay()] + ', ' + deliveryDate.getFullYear() + '/' + deliveryDate.getMonth() + '/' + deliveryDate.getDate();
      this.cartItemList = this.order.cartItemList;
    });
  }

}