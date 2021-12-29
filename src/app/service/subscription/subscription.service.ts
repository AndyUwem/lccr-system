import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SubscriptionService {

   private subs: Array<Subscription> = []

      set add (sub: Subscription) {
          this.subs.push(sub)
      }


      remove (): void {
          this.subs.forEach((sub: Subscription) => sub.unsubscribe )
      }


}