<template>
    <div class="container">
        <CoinList></CoinList>
    </div>
</template>

<script>
import CoinList from "@/components/CoinList.vue"
export default {
    name: 'Homepage',
    components: {
        CoinList
    }
}
</script>

<style>
.container {
    margin: 0 auto;
    max-width: 1280px;
}
</style>