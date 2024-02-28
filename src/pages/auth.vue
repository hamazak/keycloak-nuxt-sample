<template>
    <div>
      <button @click="initKeycloak">init Keycloak</button>
    </div>
  </template>
<script setup>
import Keycloak from 'keycloak-js'
const runtimeConfig = useRuntimeConfig()
const initKeycloak = async () => {
    const keyCloak = new Keycloak({
        url: runtimeConfig.keycloakUrl,
        realm: runtimeConfig.keycloakRealm,
        clientId: runtimeConfig.keycloakClientId
    })
    try {
        const authenticated = await keyCloak.init({
            initOptions: {
                pkceMethod: 'S256', 
                redirectUri: 'http://localhost:3000/login',
                checkLoginIframe: false
            }
        })
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    } catch (error) {
        console.error('Failed to initialize adapter:', error);
    }
}
</script>