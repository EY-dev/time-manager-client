<template>
    <nav>
        <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="100%">
                <g id="layer1">
                    <path
                        d="m 241.85068,50 a 204.64072,200.39139 0 0 0 -78.2531,20.532289 l 12.81803,21.74364 a 179.06063,175.34247 0 0 1 65.43507,-17.170253 z m 25.58009,0 V 75.105676 A 179.06063,175.34247 0 0 1 318.531,86.199608 L 329.36457,63.446184 A 204.64072,200.39139 0 0 0 267.43077,50 Z M 141.44283,83.056751 A 204.64072,200.39139 0 0 0 94.673229,125.02544 l 21.001651,14.40117 a 179.06063,175.34247 0 0 1 38.58797,-34.62622 z M 80.000649,145.54403 a 204.64072,200.39139 0 0 0 -24.275105,57.39138 l 25.248348,4.3601 A 179.06063,175.34247 0 0 1 101.0023,159.9452 Z M 51.283001,227.60469 A 204.64072,200.39139 0 0 0 50,249.99999 a 204.64072,200.39139 0 0 0 4.048849,39.66537 l 24.764724,-6.49706 a 179.06063,175.34247 0 0 1 -3.233483,-33.16831 179.06063,175.34247 0 0 1 0.95126,-18.03522 z m 34.151419,79.75929 -24.764725,6.49707 a 204.64072,200.39139 0 0 0 29.293201,55.09981 L 109.60161,352.82387 A 179.06063,175.34247 0 0 1 85.43442,307.36398 Z m 308.17214,53.2094 a 179.06063,175.34247 0 0 1 -38.58797,34.62623 l 12.81803,21.74167 a 204.64072,200.39139 0 0 0 46.7696,-41.96868 z M 126.04481,372.0137 106.4061,388.15068 a 204.64072,200.39139 0 0 0 50.32683,37.81605 l 10.83556,-22.75343 a 179.06063,175.34247 0 0 1 -41.52368,-31.1996 z m 206.82103,35.71037 a 179.06063,175.34247 0 0 1 -65.43507,17.17025 v 25.10372 a 204.64072,200.39139 0 0 0 78.25309,-20.5323 z m -142.11539,6.07633 -10.83357,22.75342 A 204.64072,200.39139 0 0 0 241.85068,450 V 424.89432 A 179.06063,175.34247 0 0 1 190.75045,413.8004 Z"
                        fill="var(--link)"
                        id="path833" />
                    <ellipse
                        ry="25.048923"
                        rx="25.58009"
                        cy="249.99998"
                        cx="254.64072"
                        id="path840"
                        fill="var(--link)" />
                    <path
                        d="m 246.96669,139.78474 h 15.34806 v 138.4743 l -7.23551,21.8388 -8.11255,-21.8388 z"
                        fill="var(--link)"
                        id="rect842" />
                    <path
                        transform="matrix(1.0232036,0,0,1.0019569,50,50)"
                        d="M 390.92904,32.439331 370.00576,85.430568 349.08248,138.42181 313.65236,93.806099 278.22224,49.190393 334.57564,40.814862 Z"
                        id="path991"
                        fill="var(--link-active)"/>
                </g>
            </svg>
            <h1> {{ $store.getters.getDictionary.menu.title }} </h1>
        </div>
        <ul class="nav-list">
            <li class="nav-link" v-if="$store.getters.isUpdateReady"><v-btn rounded small class="update-btn">update</v-btn></li>
            <li class="nav-link"><router-link to="/"> {{ $store.getters.getDictionary.menu.home }} </router-link></li>
            <li class="nav-link"><router-link to="/settings"> {{ $store.getters.getDictionary.menu.settings }} </router-link></li>
            <li class="nav-link"><router-link to="/about"> {{ $store.getters.getDictionary.menu.about }} </router-link></li>
            <li class="nav-link" v-if="$store.getters.isAuth"><v-btn rounded small class="update-btn" @click="logout()"> {{ $store.getters.getDictionary.menu.logout }}</v-btn></li>
            <li class="nav-link" v-else><v-btn to="/login" rounded small class="update-btn"> {{ $store.getters.getDictionary.menu.login }}</v-btn></li>
            <li class="nav-link"><v-switch v-model="darkMode" color="#e7558c" hide-details class="theme-switcher" @click="switchTheme" :label="label"/></li>
        </ul>
        <ham-btn class="ham-btn" @open-menu="openMenu"/>
    </nav>
</template>



<script>
import HamBtn from "@/components/HamBtn";
export default {
    name: "NavMenu",
    props:['value'],
    components: {HamBtn},
    data: () => ({
        darkMode: null,
        menuList: null,
        label: '',
    }),
    methods:{
        async accept() {
            await this.$store.dispatch('setUpdate', false);
            await this.$workbox.messageSW({ type: "SKIP_WAITING" });
        },
        switchTheme(){
            (this.darkMode) ? this.$emit('dark-mode', true) : this.$emit('dark-mode', false);
            this.$store.dispatch('setDark', this.darkMode);
        },
        getTheme(){
            this.darkMode = this.$store.getters.isDark;
        },
        openMenu(){
            this.menuList = document.querySelector('.nav-list');
            this.menuList.classList.toggle('active')
        },
        logout(){
            this.$store.dispatch('logout')
        },
        onResize(){
            this.label = this.getLabel();
        },
        getLabel() {
            if (window.innerWidth <= 800){
                return this.$store.getters.getDictionary.menu.darkMode;
            }else{return ''}
        }
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('click', this.getTheme);
            window.addEventListener('resize', this.onResize);
        });
        this.getTheme();
        this.onResize();
    }
}
</script>

<style scoped lang="less">
nav{
    width: 100%;
    height: 50px;
    background-color: var(--main-background);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo, .nav-list, .ham-btn{
        display: flex;
        height: 100%;
        align-items: center;
        padding: 0;
    }
    .logo{
        margin-left: 25px;
        h1{
            font-size: 1rem;
            color: var(--link);
        }
    }
    .nav-list{
        list-style: none;
        margin-right: 25px;
        justify-content: right;
        float: right;
        .nav-link{
            padding-left: 20px;
            a{
                text-decoration: none;
                color: var(--link);
                font-weight: 800;
            }
            a.router-link-exact-active{
                color: var(--link-active);
            }

        }
        .update-btn{
            background: var(--btn-primary);
            color: #fff!important;
            font-weight: 800;
            min-width: 100px;
        }
    }
    .ham-btn{
        display: none;
        margin-right: 25px;
        justify-content: right;
        z-index: 2;
    }
}
nav:after{
    position: absolute;
    top: 49px;
    content: '';
    width: 100%;
    border-bottom: 1px solid var(--link-active);
    z-index: 1;

}

@media only screen and (max-width: 800px){
    nav{
        .nav-list{
            display: unset;
            position: absolute;
            top:0;
            left: 0;
            transform: translate(0, -100%);
            width: 100%;
            height: 300px;
            transition: all 1s ease;
            background-color: var(--background-menu);
            z-index: 1;
            .nav-link{
                margin-top: 20px;
                padding-left: 25px;
                padding-right: 25px;
                text-align: center;
                .theme-switcher{
                    width: 200px;
                    margin: auto;
                }
            }
        }
        .ham-btn{
            display: block;
        }
        .active{
            transform: translate(0, 50px);
        }
    }
}


</style>

<style lang="less">
.v-input--selection-controls{
    margin-top: unset!important;
    padding-top: unset!important;
}
.nav-link label{
    font-weight: 800;
    color: var(--link)!important;
}
.router-link-exact-active:after{
    background-color: var(--link-active)!important;
}
.nav-link a:after{
    display: block;
    background-color: var(--link);
    height: 2px;
    width: calc(100% - 10px);
    margin-left: 5px;
    border-radius: 1px;
}
</style>
