<template>
<div class="container">
    <section v-if="localLoading">
        <div>
            Loading...
        </div>
    </section>
    <section v-else>
        <div class="coinprofile">
            <div class="coinprofile--inline">
                <div class="coinprofile_logo">
                    <img :src="localData.image.large"/>
                </div>
                <div class="coinprofile_name">
                    {{ localData.name }}
                </div>
            </div>
            <div class="coinprofile_market-cap">
               <label> Current Value: </label> {{ formatPrice(localData.market_data.current_price.eur) }}
            </div>
            <div class="coinprofile_market-cap">
                <label> Market Cap: </label> {{ formatPrice(localData.market_data.market_cap.eur) }}
            </div>
             <div class="coinprofile_market-cap">
               <label> Volume Traded: </label> {{ formatPrice(localData.market_data.total_volume.eur) }}
            </div>
            <div class="coinprofile_description" v-html="descriptionCoin">
            </div>
        </div>
    </section>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "Profile coin",
    props: {
        id: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            localLoading: true,
            localData: [],
        }
    },
    mounted () {
        this.getCoinInfo();
    },
    methods: {
        getCoinInfo: function () {
             const params = {
                'localization': false,
                'sparkline': false
            };

            axios.get('https://api.coingecko.com/api/v3/coins/'+this.id,{params})
                .then(response => ( this.localData = response.data))
                .catch(error => console.log(error))
                .finally(() => this.localLoading = false)
        },
        formatPrice: function (value) {
            return value.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2
            });
        }
    },
    computed: {
        descriptionCoin: function () {
            return this.localData && this.localData.description && this.localData.description.en ? this.localData.description.en : '';
        }
    },
}
</script>

<style>
.coinprofile {
    color: black;
    font-size: 16px;
}

.coinprofile label{
    color: black;
    font-size: 16px;
    font-weight: 700;
}

.coinprofile > div {
    padding: 20px;
}

.coinprofile--inline {
    display: flex;
    justify-content: center;
    vertical-align: middle;
    align-items: center;
}

.coinprofile--inline > div {
    padding: 10px;
}

.coinprofile_name {
    font-size: 25px;
    font-weight: bold;
}

.coinprofile_description {
    text-align: initial;
}
</style>