<template>
    <v-app>
        <v-main data-theme="dark" v-if="dark">
            <app-main @dark-mode="getTheme"/>
        </v-main>
        <v-main data-theme="light" class="light-window" v-if="light">
            <app-main @dark-mode="getTheme"/>
        </v-main>
    </v-app>
</template>

<script>
import AppMain from "@/views/AppMain";

export default {
    name: 'App',

    components: {
        AppMain,
    },

    data: () => ({
        theme: 'dark',
        light: false,
        dark: true,
        year: new Date().getFullYear(),
        link: 'https://www.ey-dev.com'
    }),
    methods:{
        getTheme(){
            const that = this;
            if(this.dark){
                this.light = true;
                setTimeout(()=>{
                    document.querySelector('.light-window').classList.add('show');
                }, 10);
                setTimeout(()=>{
                    that.dark=false;
                    that.light = true;
                }, 2010);
            }
            else{
                this.dark = true;
                setTimeout(()=>{
                    document.querySelector('.light-window').classList.remove('show');
                }, 10);
                setTimeout(()=>{
                    that.light=false;
                    that.dark = true;
                }, 2010);
            }
        },
    },
    mounted() {
        if(!this.$store.getters.isDark){
            this.getTheme('light')
        }
    },
    created() {
        if (this.$workbox) {
            this.$workbox.addEventListener("waiting", () => {
                this.$store.dispatch('setUpdate', true);
            });
        }
        this.$store.dispatch('setDark', (localStorage.getItem('theme-app') !== 'light'));
        this.$store.dispatch('setLanguage', true);
    }
};
</script>
<style lang="less">
:root{
    --main-background: #1c1b21;
    --main-background-lighter: #2a2932;
    --main-background-opposite: #dddddd;
    --link: #c0c0c0;
    --link-active: #e7558c;
    --btn-primary: linear-gradient(90deg, rgb(202, 58, 166) 0%, rgb(157, 46, 183) 100%);
    --btn-primary-left: linear-gradient(90deg, rgb(202, 58, 166) 0%, #b434b0 100%);
    --btn-primary-right: linear-gradient(90deg, #b434b0 0%, rgb(157, 46, 183) 100%);
    --background-opacity : rgba(192,192,192, 0.0);
    --background-opacity-active : rgba(192,192,192, 0.1);
    --active:#e7558c;
    --background-menu: #1c1b21;
    --error: #E53935;
    --succeed:#43A047;
    --current: #932cab;
}

[data-theme="light"] {
    --main-background: #dddddd;
    --main-background-lighter: #cdcdcd;
    --main-background-opposite: #1c1b21;
    --link: #2c3e50;
    --link-active: rgb(157, 46, 183);
    --btn-primary: linear-gradient(90deg, rgb(202, 58, 166) 0%, rgb(157, 46, 183) 100%);
    --btn-primary-left: linear-gradient(90deg, rgb(202, 58, 166) 0%, #b434b0 100%);
    --btn-primary-right: linear-gradient(90deg, #b434b0 0%, rgb(157, 46, 183) 100%);
    --background-opacity : rgba(192, 192, 192, 0.1);
    --background-opacity-active : rgba(41, 41, 41, 1);
    --background-menu: #dddddd;
}

body{
    margin: 0;
    padding: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    background-color: var(--main-background);
    min-width: 300px;
    min-height: 640px;
}

.light-window{
    position: absolute;
    opacity: 1;
    top:0;
    left:0;
    height: 100%;
    width: 100%;
    clip-path: circle(0% at calc(100% - 50px) 25px);
    transition: all 2s ease!important;
    pointer-events: none;
}

.show{
    transition: all 1s ease;
    clip-path: circle(150% at 95% 25px);
    opacity: 1;
    pointer-events: unset;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus{
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-transition-delay: 99999s;
}
</style>
