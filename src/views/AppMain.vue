<template>
    <div class="app-main">
        <nav-menu @dark-mode="getTheme"/>
        <div class="content">
            <anim-block/>
            <router-view/>
        </div>
        <footer class="footer">
            © {{year}} {{ $store.getters.getDictionary.footer.copyright[0] }} <v-icon color="red" class="copyright-icon">favorite</v-icon> {{ $store.getters.getDictionary.footer.copyright[1] }}
            <a :href="link" target="_blank" rel="noopener">EY-dev</a>&nbsp;{{ $store.getters.getDictionary.footer.copyright[2] }}
        </footer>
    </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";
import AnimBlock from "@/components/AnimBlock";
export default {
    name: "AppMain",
    components: {
        AnimBlock,
        NavMenu,
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
            this.$emit('dark-mode')
        }
    }
}
</script>

<style scoped lang="less">
.app-main{
    width: 100%;
    height: 100vh;
}
.footer{
    background-color: var(--main-background);
    width: 100%;
    height: 25px;
    color: var(--link);
    font-size: 0.8rem;
    position: fixed;
    top:100%;
    transform: translateY(-25px);
    z-index: 1;
    i{
        font-size: 21px!important;
    }
    a{
        text-decoration: none!important;
        font-weight: bold;
        color: var(--link-active)!important;
    }
}
.content{
    width: 100%;
    height: calc(100% - 50px);
    min-height: 590px;
    min-width: 300px;
    display: block;
    background-color: var(--main-background);
    padding-bottom: 25px;
}

</style>
