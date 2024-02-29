
export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        if (to.path === '/auth') {
            const { default: Keycloak } = await import('keycloak-js')
            const config = useRuntimeConfig()
            const keyCloak = new Keycloak({
                url: config.public.keycloakUrl,
                realm: config.public.keycloakRealm,
                clientId: config.public.keycloakClientId
            })
            try {
                const authenticated = await keyCloak.init({
                    onLoad: 'login-required',
                    checkLoginIframe: false
                })
                console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    
                if (authenticated) {
                    return navigateTo('/auth')
                } else {
                    return navigateTo('/login')
                }
            } catch (error) {
                console.error('Failed to initialize adapter:', error);
            }
        }
    }

})