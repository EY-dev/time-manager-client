<template>
    <div class="signup-page elevation-15">
        <h1> {{ $store.getters.getDictionary.signup.title }} </h1>
        <form class="signup-form" @submit.prevent="null">
            <div class="field">
                <label for="name"> {{ $store.getters.getDictionary.signup.name }} </label>
                <input type="text" id="name" name="user_name" class="input-field" v-model="form.name" autocomplete="on">
                <div class="text-error"> <span>{{ errors.name }}</span><v-icon class="i-error">error_outline</v-icon></div>
                <div class="text-succeed"><span>{{ succeed.name }}</span><v-icon class="i-succeed">check</v-icon></div>
            </div>
            <div class="field">
                <label for="email"> {{ $store.getters.getDictionary.signup.email }} </label>
                <input type="text" id="email" name="user_email" class="input-field" v-model="form.email" autocomplete="on">
                <div class="text-error"><span>{{ errors.email }}</span><v-icon class="i-error">error_outline</v-icon></div>
                <div class="text-succeed"><span>{{ succeed.email }}</span><v-icon class="i-succeed">check</v-icon></div>
            </div>
            <div class="field">
                <label for="pwd"> {{ $store.getters.getDictionary.signup.password }} </label>
                <input type="password" id="pwd" name="user_pwd" class="input-field"  v-model="form.pwd" autocomplete="on">
                <div class="text-error"> <span>{{ errors.pwd }}</span><v-icon class="i-error">error_outline</v-icon></div>
                <div class="text-succeed"><span>{{ succeed.pwd }}</span><v-icon class="i-succeed">check</v-icon></div>
            </div>
            <div class="field">
                <label for="confPwd"> {{ $store.getters.getDictionary.signup.confPassword }} </label>
                <input type="password" id="confPwd" name="confirm_pwd" class="input-field"  v-model="form.confPwd" autocomplete="on">
                <div class="text-error"> <span>{{ errors.confPwd }}</span><v-icon class="i-error">error_outline</v-icon></div>
                <div class="text-succeed"><span>{{ succeed.confPwd }}</span><v-icon class="i-succeed">check</v-icon></div>
            </div>
            <div class="action-box">
                <div class="field signup-link">
                    {{ $store.getters.getDictionary.signup.policy[0] }} <router-link to="/"> {{ $store.getters.getDictionary.signup.policy[1] }} </router-link> {{ $store.getters.getDictionary.signup.policy[2] }} <router-link to="/"> {{ $store.getters.getDictionary.signup.policy[3] }} </router-link>
                </div>
                <v-btn class="action-btn" rounded @click="sendData"> {{ $store.getters.getDictionary.signup.actionBtn }} </v-btn>
                <div class="field signup-link">
                    <router-link to="/login" class="to-signin"> {{ $store.getters.getDictionary.signup.signin }} </router-link>
                </div>
            </div>
        </form>
        <loading v-if="isLoading"/>
    </div>
</template>

<script>
import Loading from "@/components/Loading";
const delay = ms => new Promise(res => setTimeout(res, ms));

export default {
    name: "signup",
    components: {Loading},
    data:()=>({
        form : {name: '', email:'', pwd: '', confPwd: ''},
        errors : {name: '', email:'', pwd: '', confPwd: ''},
        succeed : {name: '', email:'', pwd: '', confPwd: ''},
        isLoading : false,
        height: 0,
        width:0
    }),
    methods:{
        setError(text, type){
            if (type==='name'){
                this.errors.name = text;
                document.querySelectorAll('.field')[0].classList.add('field-error');
            }
            if (type==='email'){
                this.errors.email = text;
                document.querySelectorAll('.field')[1].classList.add('field-error');
            }
            if (type==='password'){
                this.errors.pwd = text;
                document.querySelectorAll('.field')[2].classList.add('field-error');
            }
            if (type==='confirm-password'){
                this.errors.confPwd = text;
                document.querySelectorAll('.field')[3].classList.add('field-error');
            }
        },
        setSucceed(type, text){
            const fields = document.querySelectorAll('.field');
            if (type==='name'){
                this.succeed.name = text;
                fields[0].classList.add('field-succeed');
            }
            if (type==='email'){
                this.succeed.email = text;
                fields[1].classList.add('field-succeed');
            }
            if (type==='password'){
                this.succeed.pwd = text;
                fields[2].classList.add('field-succeed');
            }
            if (type==='confirm-password'){
                this.succeed.confPwd = text;
                fields[3].classList.add('field-succeed');
            }
        },
        clearError(){
            const fields = document.querySelectorAll('.field');
            fields.forEach(field => {
                field.classList.remove('field-error')
            })
            this.errors = {name: '', email:'', pwd: '', confPwd: ''};
        },
        clearSucceed(){
            const fields = document.querySelectorAll('.field');
            this.succeed.password = '';
            this.succeed.email = '';
            this.succeed.name = '';
            this.succeed.confPwd = '';
            fields.forEach(field => {
                field.classList.remove('field-succeed')
            })
            this.errors = {email:'', password: '', name:'', confPwd:''}
        },
        async sendData() {
            this.clearSucceed()
            this.clearError()
            if (this.validate()) {
                document.querySelector(".signup-form").classList.add("blur-10");
                await delay(250);
                this.isLoading = true;
                await this.fetchData();
            }
        },

        async fetchData(){
            await delay(1000);
            let request = false
            let errorMsg = ''
            let that = this
            console.log(this.form)
            this.$store.dispatch('addNewUser', {name: this.form.name, 'email' : this.form.email, 'pwd' : this.form.pwd})
                .then(()=>{request = true})
                .catch((error)=> {
                    errorMsg = error.message;
                    request = false
                })
                .finally(() => {that.decoration(request, errorMsg)})

        },

        async decoration(isSucceed, errorMsg){
            await delay(250);
            this.isLoading = false;
            document.querySelector(".signup-form").classList.remove("blur-10");
            await delay(500);
            if (isSucceed) {
                await delay(500);
                this.setSucceed('name', 'OK');
                await delay(250);
                this.setSucceed('email', 'OK');
                await delay(250);
                this.setSucceed('password', 'OK');
                await delay(250);
                this.setSucceed('confirm-password', 'OK');
                await delay(1000);
                this.$router.push('/home').catch(e => {console.log(e)})
            }
            else{
                if (errorMsg === 'email exist'){
                    await delay(500);
                    this.setSucceed('name', 'OK');
                    this.setError(this.$store.getters.getDictionary.errors.emailExist, "email");
                    await delay(250);
                }
                else{
                    console.log(isSucceed, errorMsg)
                    this.setError(this.$store.getters.getDictionary.errors.undefined, 'name');
                    await delay(250);
                    this.setError(this.$store.getters.getDictionary.errors.undefined, "email");
                    await delay(250);
                    this.setError(this.$store.getters.getDictionary.errors.undefined, "password");
                    await delay(250);
                    this.setError(this.$store.getters.getDictionary.errors.undefined, "confirm-password");
                    await delay(250);
                }
            }
        },

        validate(){
            let status = true
            if (!this.validName()){status = false}
            if (!this.validEmail()){status = false}
            if (!this.validPwd()){status = false}
            if (!this.validConfPwd()){status = false}
            return status;
        },
        validName(){
            if (this.form.name === ""){
                this.setError(this.$store.getters.getDictionary.errors.emptyField, "name");
                return false;
            }
            return true;
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
        validPwd(){
            if (this.form.pwd === ""){
                this.setError(this.$store.getters.getDictionary.errors.emptyField, "password");
                return false;
            }
            return true;
        },
        validConfPwd(){
            if (this.form.confPwd === ""){
                this.setError(this.$store.getters.getDictionary.errors.emptyField, "confirm-password");
                return false;
            }
            if (this.form.confPwd !== this.form.pwd){
                this.setError(this.$store.getters.getDictionary.errors.pwdNotMatch, "confirm-password");
                return false;
            }
            return true;
        },
    },
    mounted() {
        document.querySelector('.to-signin').addEventListener("click", () => {
            document.querySelector('.signup-page').classList.add("move-out-blur");
        })
        this.height = window.innerHeight
        this.width = window.innerWidth
        const fields = document.querySelectorAll('.input-field');
        fields.forEach(field => {
            field.addEventListener('input', ()=>{
                field.parentElement.classList.remove('field-error');
                this.errors[field.id] = '';
            })
        })
    }
}
</script>

<style scoped lang="less">
.signup-page{
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
        padding-top: 25px;
        font-size: 1.8rem;
        padding-left: 25px;
        width: 250px;
        text-align: left;
        color: #dddddd;
        height: 20%;
        max-height: 150px;
    }
    .signup-form{
        animation: not-blur 0.25s;
        position: relative;
        height: 80%;
        width: 100%;
        padding: 25px;
        transition: all .25s ease;
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
            height: calc(100% - 248px);
            position: relative;
            .signup-link{
                font-size: 0.8rem;
            }
        }
        .signup-link:nth-child(1){
            position: absolute;
            top:0;
            left: 50%;
            transform: translate(-50%, 0);
            font-size: 0.7rem;
        }
        .action-btn{
            position: absolute;
            top:50%;
            left: 50%;
            width: 130px;
            transform: translate(-50%, -50%);
            background: var(--btn-primary);
            color: #fff!important;
            font-weight: 800;
        }
        .signup-link:nth-child(3){
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
}
@media only screen and (max-width: 400px){
    .signup-page{
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
    .signup-page{
        transform: translate(-50%, 0);
        top: 75px;
    }
}
</style>

<style>

</style>
