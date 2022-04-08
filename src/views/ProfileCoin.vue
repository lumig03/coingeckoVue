<template>
    <section v-if="localLoading">
        <div>
            Loading...
        </div>
    </section>
    <section v-else>
        <div class="coinprofile">
            <div class="coinprofile_logo">
                <img :src="localData.image.large"/>
            </div>
            <div class="coinprofile_name">
                {{ localData.name }}
            </div>
            <div class="coinprofile_market-cap">
               Current Value: {{ formatPrice(localData.market_data.current_price.eur) }}
            </div>
            <div class="coinprofile_market-cap">
                Market Cap: {{ formatPrice(localData.market_data.market_cap.eur) }}
            </div>
             <div class="coinprofile_market-cap">
                Volume Traded: {{ formatPrice(localData.market_data.total_volume.eur) }}
            </div>
            <div class="coinprofile_description" v-html="descriptionCoin">
            </div>
        </div>
    </section>
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

</style>