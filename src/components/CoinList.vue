<template>
  <div class="coinlist">
      <div class="coinlist_item-wrapper" v-for="(item, index) in localList" :key="index">
            <router-link class="coinlist_item" :to="{ name: 'ProfileCoin', params:{'id': item.id }}">
                <div class="coinlist_item-image">
                    <img :src="item.image"/>
                </div>
                <div class="coinlist_item-name">
                    {{ item.name }}
                </div>
                <div class="coinlist_item-price">
                    {{ formatPrice(item.current_price) }}
                </div>
            </router-link>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Coins List",
    data() {
        return {
            localList: [],
            // Initial page value
            localPage: 1
        }
    },
    mounted () {
        this.getCoinsList();
    },
    methods: {
        getCoinsList: function () {
             const params = {
                'vs_currency': 'eur',
                'order': 'market_cap_desc',
                'per_page': 100,
                'page': this.localPage,
                'sparkline': false
            };

            axios.get('https://api.coingecko.com/api/v3/coins/markets',{params})
                .then(response => ( this.localList = response.data))
                .catch(error => console.log(error))
        },
        formatPrice: function (value) {
            return value.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2
            });
        }
    },

}
</script>

<style>
.coinlist_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    text-decoration: none;
    color: black;
}

.coinlist_item-wrapper:nth-of-type(even) {
    background-color: #EADDA6;
}

.coinlist_item-wrapper:nth-of-type(odd) {
    background-color: #FFFAE2;
}

.coinlist_item-image img {
    width: 5em;
    height: auto;
}

.coinlist_item-name {
    font-size: 25px;
    font-weight: 700;
}

.coinlist_item-price {
    font-size: 25px;
    font-weight: 700;
}
</style>