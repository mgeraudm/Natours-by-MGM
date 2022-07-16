/*eslint-disable*/

//import axios from 'axios';
import { showAlert } from './alert';

//const stripe = require('stripe')(  pk_test_51LLWEUJmJeA8lB0hIZAlatOx1tlBhNIrtReHcAUljPkFIX5M3m7IfWpnaxc8W0iBeEeopOAGGLpDsJYXVz7u3dXc00Kb92iYaV);
//const Stripe = require('stripe');

const stripe = Stripe(
  'pk_test_51KWBrzSGKmkk3pD9EQE5Beo0E7TxDyIlg6lrNV41iHk4W0nRSrTcMZiVZTj87YKdX4xOtf1vTy8mY0aKR1BAhmVV0r1NcylZ'
);

export const bookTour = async tourId => {
  try {
    //get check out session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    //console.log(`SESSION ${session}`);

    /*create checkout form & creditcard
    await stripe.redirectToCheckout({
      sessionId: session.url
    });
    */
    //workaround:
    window.location.replace(session.data.session.url);
  } catch (err) {
    // console.log(err);
    alert(err);
    showAlert('error', err);
  }
};
