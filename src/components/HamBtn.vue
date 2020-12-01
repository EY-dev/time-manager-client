<template>
    <div>
        <div class="menu-btn" @click="showMenu">
            <div class="lines">
                <div class="line">
                    <div class="top-left"/>
                    <div class="top-right"/>
                </div>
                <div class="line"/>
                <div class="line">
                    <div class="bottom-left"/>
                    <div class="bottom-right"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HamBtn",
    data:()=>({
        menuBtn: null
    }),
    methods:{
        showMenu(){
            this.menuBtn = document.querySelector('.menu-btn');
            this.menuBtn.classList.toggle('active');
            this.$emit('open-menu');
        }
    },
    mounted() {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', ()=>{
                document.querySelector('.menu-btn').classList.remove('active');
                document.querySelector('.nav-list').classList.remove('active');
            })
        })
    }
}
</script>

<style scoped lang="less">
.menu-btn{
    margin-left: auto;
    top: 50%;
    float: right;
    position: relative;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 20px;
    transition: all 0.5s ease;
    display: inline-block;
    .lines{
        margin-top: 10px;
        .line{
            width: 26px;
            height: 4px;
            margin: auto auto 4px auto;
            border-radius: 2px;
            transition: all 0.25s ease;
            .top-left, .top-right, .bottom-left, .bottom-right{
                width: 13px;
                height: 4px;
                flex: 1;
                transition: all 0.5s ease;
            }
            .top-left, .bottom-left{
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
                background: var(--btn-primary-left);
            }
            .top-right, .bottom-right{
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
                background: var(--btn-primary-right);
            }
        }
        .line:nth-child(1),.line:nth-child(3){
            display: flex;
        }
        .line:nth-child(2){
            background: var(--btn-primary);
        }
    }
}
.menu-btn:hover{
    background-color: var(--link);
    cursor: pointer;
}
.active{
    .line:nth-child(2), .line:nth-child(5){
        animation: middle-line .5s;
        width: 4px;
    }
    .line:nth-child(1), .line:nth-child(4){
        .top-left{
            transform: translateY(2px) rotateZ(45deg);
        }
        .top-right{
            transform: translateY(2px) rotateZ(-45deg);
        }
    }
    .line:nth-child(3), .line:nth-child(6){
        .bottom-left{
            transform: translateY(-2px) rotateZ(-45deg);
        }
        .bottom-right{
            transform: translateY(-2px) rotateZ(45deg);
        }
    }
}
@keyframes middle-line {
    0%   {width: 26px;}
    50%  {width: 38px;}
    66%  {width: 26px;}
    100% {width: 4px;}
}
</style>
