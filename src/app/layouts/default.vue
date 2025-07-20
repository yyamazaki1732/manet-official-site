<template>
    <div>
        <AppHeader />
        <h2>main</h2>
        <slot />
        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import AppHeader from '~/widgets/shared/AppHeader.vue';
import AppFooter from '~/widgets/shared/AppFooter.vue';
</script>