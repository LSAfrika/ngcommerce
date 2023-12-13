import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  paymenthandler:any=null
  order=''
  stripepublickey='pk_test_51OHhB1IFaA81v9I8t0SD4xSDEhB9Zj0f4WzVPsTxdS1d1KAFN7e4az40oUIsZKuRLa4tGnR0uEzMjD7EQuAonnAu00VCSs62Kk'
  constructor() { }


  stripeinitialize(){
    if(!window.document.getElementById('stripe-script')){
      const script=window.document.createElement('script')
      script.id='stripe-script'
      script.type='text/javascript'
      script.src='https://checkout.stripe.com/checkout.js'
      script.onload=()=>{
        this.paymenthandler=(<any>window).StripeCheckout.configure({
          key:this.stripepublickey,
          locale:'auto',
          token:function stripetoken(stripeToken:any) {
            console.log('token from stripe: ',stripeToken)
          }
        })
      }
      window.document.body.appendChild(script)
    }
  }

  initializepaymentintent(amount:number){

    const paymenthandler= (<any>window).StripeCheckout.configure({
      key:this.stripepublickey,
      locale:'auto',
      token:function (stripetoken:any ) {
        console.log('token from parment intent:',stripetoken);


      }

    })

    paymenthandler.open({
      name:`${this.order}`,
      description:`payment for order ${this.order}`,
      amount:(amount/150)*100
    })
  }
}
