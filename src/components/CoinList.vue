<template>
    <section v-if="localLoading">
        <div>
            Loading...
        </div>
    </section>
    <section v-else>
        <div class="coinlist">
            <div class="coinlist_search">
                <input type="text" placeholder="Search.." v-model="localSearch" @keyup.enter="searchByName">
            </div>
            <div class="coinlist_item-wrapper" v-for="(item, index) in filteredCoinsList" :key="index">
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
    </section>
</template>

<script>
import axios from "axios";
export default {
    name: "Coins List",
    data() {
        return {
            localList: [],
            // Initial page value
            localPage: 1,
            localSearch: '',
            localLoading: true,
            // Used after getting ids from search service
            localCoinsIds: []
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
                'sparkline': false,
                'ids': this.localCoinsIds.join()
            };

            axios.get('https://api.coingecko.com/api/v3/coins/markets',{params})
                .then(response => ( this.localList = response.data))
                .catch(error => console.log(error))
                .finally(() => this.localLoading = false)
        },
        formatPrice: function (value) {
            return value.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2
            });
        },
        searchByName: function () {
            var self = this;
            this.localLoading = true;
            var resultSearch = [];
            if (this.localSearch != '') {
                 axios.get('https://api.coingecko.com/api/v3/search?query='+this.localSearch)
                .then(response => ( resultSearch = response.data.coins))
                .catch(error => console.log(error))
                .finally(function () {
                    self.localCoinsIds = resultSearch.map(coin => coin.id);
                    self.getCoinsList();
                })
            } else {
                // Reset list
                self.localCoinsIds = [];
                self.getCoinsList();
            }
        }
    },
    computed: {
        filteredCoinsList: function () {
            //return this.localList.filter()
            return this.localList.filter( (coin) => {
                return (
                    coin.name
                        .toLowerCase()
                        .indexOf(this.localSearch) != -1
                    );
            });
        }
    }

}
</script>

<style>
.coinlist_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    text-decoration: none;
    color: black;
}

.coinlist_item-wrapper:nth-of-type(even) {
    background-color: #EADDA6;
}

.coinlist_item-wrapper:nth-of-type(odd) {
    background-color: #FFFAE2;
}

.coinlist_item-wrapper:hover {
    background-color: #b3ab89;
}

.coinlist_item-image img {
    width: 2em;
    height: auto;
}

.coinlist_item-name {
    font-size: 18px;
    font-weight: 700;
}

.coinlist_item-price {
    font-size: 18px;
    font-weight: 700;
}

.coinlist_search  input{
    font-size: 16px;
    border: 2px solid black;
    border-radius: 4px;
    line-height: 30px;
    margin: 10px 0px;
}
</style>