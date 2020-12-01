<template>
    <div class="home">
        <h1>{{ title }}<span v-if="$store.getters.isAuth">, {{ $store.getters.getUser.name }}</span></h1>
        <calendar @new-day="newDay"/>
        <day-schedule :day="activeDay"/>
    </div>
</template>

<script>
// @ is an alias to /src


import Calendar from "@/components/Calendar";
import DaySchedule from "@/components/DaySchedule";
export default {
    name: 'Home',
    components: {DaySchedule, Calendar},
    data :()=>({
        title: null,
        today: new Date(),
        activeDay: null,
    }),
    methods:{
        newDay(day){
            this.activeDay = day;
        },
        getTime(){
            return this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
        },
        getPartOfDay(){
            if (this.today.getHours() < 12){return 0;}
            if ((this.today.getHours() >= 12) && (this.today.getHours() < 16)){return 1;}
            else{
                return 2;
            }
        }
    },
    created() {
    },
    mounted() {
        this.title = this.$store.getters.getDictionary.home.title[this.getPartOfDay()];
    }
}
</script>
<style scoped lang="less">
.home{
    width: 100%;
    height: 100%;

    h1{
        width: 100%;
        text-align: right;
        font-size: 1.5rem;
        padding-right: 25px;
        padding-top: 15px;
        color: var(--link);
        span{
            color: var(--active);
        }
    }
}
</style>
