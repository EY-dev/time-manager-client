<template>
    <div class="elevation-15 login-page">
        <h1> {{ $store.getters.getDictionary.login.title }} </h1>
        <form class="login-form" @submit.prevent="null">
            <div class="field">
                <label for="email"> {{ $store.getters.getDictionary.login.email }} </label>
                <input type="text" id="email" name="user_email" class="input-field" v-model="form.email" autocomplete="on">
                <div class="text-error"> <span>{{ errors.email }}</span><v-icon class="i-error">error_outline</v-icon></div>
                <div class="text-succeed"><span>{{ succeed.email }}</span><v-icon class="i-succeed">check</v-icon></div>
            </div>
            <div class="field">
                <label for="password"> {{ $store.getters.getDictionary.login.password }} </label>
                <input type="password" id="password" name="user_password" class="input-field"  v-model="form.password" autocomplete="on">
                <div class="text-error"> <span>{{ errors.password }}</span><v-icon class="i-error">error_outline</v-icon></div>
                <div class="text-succeed"><span>{{ succeed.password }}</span><v-icon class="i-succeed">check</v-icon></div>
            </div>
            <div class="action-box">
                <div class="field login-link">
                    <router-link to="/forgot-password" class="to-forgot-password"> {{ $store.getters.getDictionary.login.changepassword }} </router-link>
                </div>
                <v-btn class="action-btn" rounded @click="sendData"> {{ $store.getters.getDictionary.login.actionBtn }} </v-btn>
                <div class="field login-link">
                    {{ $store.getters.getDictionary.login.signup[0] }} <router-link to="/signup" class="to-signup"> {{ $store.getters.getDictionary.login.signup[1] }} </router-link>
                </div>
            </div>
        </form >
        <loading  v-if="isLoading"/>
    </div>
</template>

<script>
import Loading from "@/components/Loading";
const delay = ms => new Promise(res => setTimeout(res, ms));
export default {
    name: "Login",
    components: {Loading},
    data:()=>({
        form : {email:'', password: ''},
        errors : {email:'', password: ''},
        succeed: {email:'', password: ''},
        isLoading: false,
        height: 0,
        width:0
    }),
    methods:{
        setError(text, type){
            if (type==='email'){
                this.errors.email = text;
                document.querySelectorAll('.field')[0].classList.add('field-error');
            }
            if (type==='password'){
                this.errors.password = text;
                document.querySelectorAll('.field')[1].classList.add('field-error');
            }
        },
        clearError(){
            const fields = document.querySelectorAll('.field');
            fields.forEach(field => {
                field.classList.remove('field-error')
            })
            this.errors = {email:'', password: ''}
        },
        setSucceed(type, text){
            const fields = document.querySelectorAll('.field');
            if (type==='email'){
                this.succeed.email = text;
                fields[0].classList.add('field-succeed');
            }
            if (type==='password'){
                this.succeed.password = text;
                fields[1].classList.add('field-succeed');
            }
        },
        clearSucceed(){
            const fields = document.querySelectorAll('.field');
            this.succeed.password = '';
            this.succeed.email = '';
            fields.forEach(field => {
                field.classList.remove('field-succeed')
            })
            this.errors = {email:'', password: ''}
        },
        validate(){
            let status = true
            if (!this.validEmail()){status = false}
            if (!this.validPassword()){status = false}
            return status;
        },
        validEmail(){
            if (this.form.email === ""){
                this.setError(this.$store.getters.getDictionary.errors.emptyField, "email");
                return false;
            }
            if (!/.+@.+\..+/.test(this.form.email)){
                this.setError(this.$store.getters.getDictionary.errors.emailFail, "email");
                return false;
            }
            return true;
        },
        validPassword(){
            if (this.form.password === ""){
                this.setError(this.$store.getters.getDictionary.errors.emptyField, "password");
                return false;
            }
            return true;
        },
        async decoration(isSucceed, errorMsg){
            this.isLoading = false;
            document.querySelector(".login-form").classList.remove("blur-10");
            await delay(500);
            if (isSucceed) {
                this.setSucceed('email', 'OK');
                await delay(250);
                this.setSucceed('password', 'OK');
                await delay(250);
                this.$router.push('/home').catch(e => {console.log(e)})
            }
            else{
                if (errorMsg === 'wrong email'){
                    this.setError(this.$store.getters.getDictionary.errors.emailFail, "email");
                    await delay(250);
                }
                else if (errorMsg === 'wrong password'){
                    this.setSucceed('email', 'OK');
                    await delay(250);
                    this.setError(this.$store.getters.getDictionary.errors.passwordNotMatch, "password");
                    await delay(250);
                }
                else{
                    console.log(isSucceed, errorMsg)
                    this.setError(this.$store.getters.getDictionary.errors.undefined, "email");
                    await delay(250);
                    this.setError(this.$store.getters.getDictionary.errors.undefined, "password");
                    await delay(250);
                }
            }
        },
        async fetchData(){
            await delay(1000);
            let request = false
            let errorMsg = ''
            let that = this
            this.$store.dispatch('auth', {'email' : this.form.email, 'pwd' : this.form.password})
                .then(()=>{request = true})
                .catch((error)=> {
                    errorMsg = error.message;
                    request = false
                })
                .finally(() => {that.decoration(request, errorMsg)})

        },
        async sendData() {
            this.clearSucceed()
            this.clearError()
            if (this.validate()) {
                document.querySelector(".login-form").classList.add("blur-10");
                await delay(250);
                this.isLoading = true;
                await this.fetchData();//get result
            }
        },
    },
    created() {

    },
    mounted() {
        this.height = window.innerHeight
        this.width = window.innerWidth
        this.elevation = 0;
        this.interval = setInterval(() => {
            if (this.elevation > 14){
                return;
            }
            else{
                this.elevation++
            }
        }, 100)
        const fields = document.querySelectorAll('.input-field');
        fields.forEach(field => {
            field.addEventListener('input', ()=>{
                field.parentElement.classList.remove('field-error');
                this.errors[field.id] = '';
            })
        })
        document.querySelector('.to-signup').addEventListener("click", () => {
            document.querySelector('.login-page').classList.add("move-out-blur");
        })
        document.querySelector('.to-forgot-password').addEventListener("click", () => {
            document.querySelector('.login-page').classList.add("move-out-blur");
        })
    }
}
</script>

<style scoped lang="less">
.blur-10{
    filter: blur(10px);
}
.loading{
    animation: not-blur 0.25s;
    position: relative;
    height: 80%;
    width: 100%;
    top: -80%
}
.login-page{
    animation: not-blur 0.5s;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 600px;
    border-radius: 20px;
    background-image: url("../assets/login-back.svg");
    background-size: cover;
    color: var(--link);
    transition: all .5s ease;
    h1{
        padding-top: 43%;
        font-size: 1.8rem;
        padding-left: 25px;
        width: 250px;
        text-align: left;
    }
    .login-form{
        position: relative;
        height: calc(100% - 43% + 8px);
        width: 100%;
        padding: 25px;
        .field{
            width: 100%;
            margin-bottom: -16px;
            input{
                width: 100%;
                text-decoration: none;
                border: unset;
                background-color: var(--main-background);
                display: block;
                color: var(--link);
                font-size: 0.8rem;
            }
            .input-field:active, .input-field:focus{
                outline: unset;
            }
            .text-error, .text-succeed{
                pointer-events: none;
            }
            .text-error:after{
                content: '';
                height: 2px;
                width: 100%;
                background-color: var(--link);
                display: block;
                pointer-events: none;
            }
            .input-field:active ~ .text-error:before,
            .input-field:focus ~ .text-error:before{
                background-color: var(--link-active);
            }
            label{
                float: left;
            }
        }
        .field:hover{
            input{
                background-color: var(--main-background-lighter);
            }
        }
        .field-error{
            label{
                color: var(--error)!important;
            }
            .i-error{
                color: var(--error)!important;
                font-size: 0.8rem;
                display: unset!important;
            }
            input{
                background-color: var(--main-background);
                color: var(--error)!important;
            }
            .text-error:after{
                content: '';
                height: 2px;
                width: 100%;
                background-color: var(--error);
            }
        }
        .field-succeed{
            label{
                color: var(--succeed)!important;
            }
            .i-succeed{
                color: var(--succeed)!important;
                font-size: 0.8rem;
                display: unset!important;
            }
            input{
                background-color: var(--main-background);
                color: var(--succeed)!important;
            }
            .text-error:after{
                content: '';
                height: 2px;
                width: 100%;
                background-color: var(--succeed);
            }
        }
        .action-box{
            width: 100%;
            height: calc(100% - 120px);
            position: relative;
            .login-link{
                font-size: 0.8rem;
            }
        }
        .login-link:nth-child(1){
            position: absolute;
            top:25px;
            left: 50%;
            transform: translate(-50%, 0);
        }
        .action-btn{
            position: absolute;
            top:75px;
            left: 50%;
            width: 130px;
            transform: translate(-50%, 0);
            background: var(--btn-primary);
            color: #fff!important;
            font-weight: 800;
        }
        .login-link:nth-child(3){
            position: absolute;
            top:100%;
            left: 50%;
            transform: translate(-50%, -100%);
        }
        .text-error{
            text-align: right;
            font-size: 0.7rem;
            position: relative;
            top: -18px;
            span{
                margin-right: 5px;
                color: var(--error);
            }
            i{
                display: none;
            }
        }
        .text-succeed{
            text-align: right;
            font-size: 0.7rem;
            position: relative;
            top: -36px;
            span{
                margin-right: 5px;
                color: var(--succeed);
            }
            i{
                display: none;
            }
        }
    }
}
@media only screen and (max-width: 400px){
    .login-page{
        position: unset;
        transform: unset;
        border-radius: unset;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
    }
}
@media only screen and (max-height: 725px) and (min-width: 401px){
    .login-page{
        transform: translate(-50%, 0);
        top: 75px;
    }
}
</style>

<style>
#email:-webkit-autofill,
#email:-webkit-autofill:hover,
#email:-webkit-autofill:focus,
#email:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-transition-delay: 99999s;
}
#password:-webkit-autofill,
#password:-webkit-autofill:hover,
#password:-webkit-autofill:focus,
#password:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-transition-delay: 99999s;
}
input {
    filter: none;
}
.move-out-blur{
    filter: blur(100px);
}
.field-succeed input:-webkit-autofill,
.field-succeed input:-webkit-autofill:hover,
.field-succeed input:-webkit-autofill:focus,
.field-succeed input:-webkit-autofill:active{
    -webkit-text-fill-color: var(--succeed)!important;
}
@keyframes not-blur {
    0% {filter: blur(100px);}
    100% {filter: blur(0);}
}
</style>
