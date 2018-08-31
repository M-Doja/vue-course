new Vue({
    el: '#app',
    data: {
        isShowingCart: false,
        cart: {
          items: []
        },
        products: [
            {
                id: 1,
                name: 'MacBook Pro (15 inch)',
                description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
                price: 2999,
                inStock: 50
            },
            {
                id: 2,
                name: 'Samsung Galaxy Note 7',
                description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
                price: 299,
                inStock: 755
            },
            {
                id: 3,
                name: 'HP Officejet 5740 e-All-in-One-printer',
                description: 'This one might not last for so long, but hey, printers never work anyways, right?',
                price: 149,
                inStock: 5
            },
            {
                id: 4,
                name: 'iPhone 7 cover',
                description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                price: 49,
                inStock: 42
            },
            {
                id: 5,
                name: 'iPad Pro (9.7 inch)',
                description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
                price: 599,
                inStock: 0
            },
            {
                id: 6,
                name: 'OnePlus 3 cover',
                description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                price: 19,
                inStock: 81
            }
        ]
    },
    methods: {
      addProductToCart: function(product){
        const cartItem = this.getCartItem(product);

        if (cartItem != null) {
          cartItem.quanity++;
        }else {
          this.cart.items.push({
            product: product,
            quanity: 1
          });
        }
        product.inStock--;
      },
      getCartItem: function(product){
        for (var i = 0; i <this.cart.items.length; i++) {
          if (this.cart.items[i].product.id === product.id) {
            return this.cart.items[i];
          }
        }
        return null;
      },
      increaseQuanity: function(cartItem){
        cartItem.product.inStock--;
        cartItem.quanity++;
      },
      decreaseQuanity: function(cartItem){
        cartItem.product.inStock++;
        cartItem.quanity--;

        if (cartItem.quanity == 0) {
          this.removeItemFromCart(cartItem);
        }
      },
      removeItemFromCart: function(cartItem){
        const idx = this.cart.items.indexOf(cartItem);
        if (idx !== -1) {
          this.cart.items.splice(idx, 1);
        }

      },
      checkout: function(){
        if (confirm("Are you sure you wasnt to purchase these items?")) {
          this.cart.items.forEach(function(item){
            item.product.inStock += item.quanity;

          });
          this.cart.items = [];
        }
      }
    },
    computed: {
      cartTotal: function(){
        let total = 0;
        this.cart.items.forEach(function(item){
          total += item.quanity * item.product.price
        });
        return total;
      },
      taxAmount: function(){
          if (this.cartTotal > 2000){
            return (this.discountedAmount * 10 / 100)
          }else {
            return (this.cartTotal * 10 / 100);
          }

      },
      discountedAmount: function(){
        if (this.cartTotal > 2000) {
          const coupon = (this.cartTotal * 20 / 100);
          return this.cartTotal - coupon;
        }
      }
    },
    filters: {
      currency: function(value){
        const formatter = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2
        });
        return formatter.format(value);
      }
    }
});
