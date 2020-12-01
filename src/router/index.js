import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/home', redirect: '/' },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {

    if ((from.name === "Login" && to.name === "Signup")||(from.name === "Signup" && to.name === "Login")
    ||  (from.name === "Login" && to.name === "ForgotPassword")||(from.name === "ForgotPassword" && to.name === "Login")){
        setTimeout(()=>{
            next();
        }, 500);
    }
    else{
        const animBox = document.querySelector(".anim-block");
        const width = Math.floor(Math.random() * 100);
        const height = Math.floor(Math.random() * 100);
        if (animBox !== null){
            animBox.setAttribute('style', 'clip-path: circle(0% at ' + width + '% ' + height + '%);')
            animBox.classList.add('anim-block-active');
            setTimeout(()=>{
                animBox.classList.remove('anim-block-active');
                next();
            }, 1000);
        }
        else{
            next();
        }
    }
})
export default router
