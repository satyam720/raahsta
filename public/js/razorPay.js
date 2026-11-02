import axios from 'axios';

export const initClientRzrPay = function (data) {
  var options = {
    key: data.key,
    order_id: data.order.id,
    amount: data.order.amount,
    currency: data.order.currency,
    name: 'Natours',
    description: data.tour.name,
    image: '/img/logo-green.png',

    prefill: {
      name: data.customer.name,
      email: data.customer.email,
    },

    handler: async function (payment) {
      try {
        const result = await axios.post('/api/v1/bookings/verify-payment', payment);
        if (result.data.status === 'success') window.location.assign('/');
      } catch (error) {
        alert(error.response?.data?.message || 'Unable to verify payment. Please contact support.');
      }
    },

    modal: {
      ondismiss() {
        window.location.assign(`/tour/${data.tour.slug}`);
      },
    },

    theme: {
      color: '#55c57a',
    },
  };
  const checkout = new window.Razorpay(options);
  checkout.on('payment.failed', ({ error }) => {
    console.error('Razorpay payment failed:', {
      code: error.code,
      description: error.description,
      source: error.source,
      step: error.step,
      reason: error.reason,
    });
  });
  return checkout;
};

export const requestOrder = async function(bookTourBtn) {
    try {
      const tourId = bookTourBtn.dataset.tourId;
      const { data } = await axios.get(
        `/api/v1/bookings/checkout-session/${tourId}`,
      );

      const checkout = initClientRzrPay(data);
      checkout.open();
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to open checkout');
    } finally {
      bookTourBtn.disabled = false;
    }
}
