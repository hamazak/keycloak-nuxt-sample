<template>
    <div>
        <h1>認証必要画面</h1>
    </div>
  </template>
<script setup>
import Keycloak from 'keycloak-js'
definePageMeta({
    middleware: 'auth'
})
</script>