<template>
    <header :class="['header']">
        <h1>App Header / 'welcome' {{ $t('welcome') }} <br>{{ $t('top') }}</h1>
        <div class="locales">
            <button v-for="(locale, index) in locales" :key="locale.code" type="button" @click="setLocale(locale.code)">
                {{ locale.code }} <span v-if="index < locales.length - 1">-</span>
                {{ locale.name }}
            </button>
        </div>
    </header>
</template>

<script setup lang="ts">
const { locales, setLocale } = useI18n()
</script>

<style scoped>
.header {
    background-color: #213141;
    color: white;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #dee2e6;
    min-height: 30px;
}
</style>
