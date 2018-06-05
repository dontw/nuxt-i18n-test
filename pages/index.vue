<template>
    <section class="container">
        <div>
            <app-logo/>
            <h1 class="title">
                dali-backend
            </h1>
            <h2 class="subtitle">
                Current Language Code: {{$i18n.locale}}
            </h2>
            <div class="links">
                <!-- switch language example -->
                <nuxt-link v-for="locale in $i18n.locales" v-if="locale.code !== $i18n.locale" :key="locale.code" :to="switchLocalePath(locale.code)">{{ locale.name }}</nuxt-link>
                <!-- testing link -->
                <br>
                <nuxt-link :to="localePath('login', $i18n.locale)">to login</nuxt-link>
            </div>
        </div>
    </section>
</template>

<script>
export default {}
</script>
<style lang="less">
</style>
