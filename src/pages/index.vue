<template>
    <h1>index.vue</h1>
    <NuxtImg v-slot="{ src, isLoaded, imgAttrs }" src="/img/paypay.png" alt="image" width="400" height="400"
        :custom="true">
        <!-- Show the actual image when loaded -->
        {{ isLoaded }}
        <img v-if="isLoaded" v-bind="imgAttrs" :src="src">

        <!-- Show a placeholder while loading -->
        <img v-else src="https://placehold.co/400x400" alt="placeholder">
    </NuxtImg>
</template>
