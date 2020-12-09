<template>
    <div class="days-selector" v-if="isReady">
        <div class="days">
            <day-card v-for="(day, index) in days" :key="index" :day="day" :id="getId(day)"/>
        </div>
    </div>
</template>

<script>
import DayCard from "@/components/DayCard";
export default {
    name: "DaysSelector",
    components: {DayCard},
    data: ()=>({
        totalDays: 0,
        days:[],
        day: {
            date: '',
            month: '',
            dayOfWeek: '',
            year: ''
        },
        isReady: false,
    }),
    methods:{
        getId(day){
            return 'card-' + day.date + this.$store.getters.getDictionary.home.month[day.month] + day.year;
        },
        getTotalDays(){
            const today = new Date();
            const date1 = new Date("01/01/"+ (today.getFullYear() - 1));
            const date2 = new Date("12/31/"+ (today.getFullYear() + 1));
            return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
        },
        createCalendar(){
            let day = new Date("01/01/"+ (new Date().getFullYear() - 1));
            for (let i = 0; i < this.totalDays; i++){
                this.days[i] = {};
                this.days[i].date      = day.getDate();
                this.days[i].year      = day.getFullYear();
                this.days[i].month     = day.getMonth();
                this.days[i].index     = i;
                this.days[i].dayOfWeek = day.getDay();
                day.setDate(day.getDate()+1);
            }
        },
    },
    created() {
        this.totalDays = this.getTotalDays();
        this.createCalendar();
        this.isReady = true;
    },
    mounted() {
        let cards = document.querySelectorAll('.day-card');
        cards.forEach(card => {
            card.addEventListener("click", () => {
                cards.forEach(card => {card.classList.remove('card-active')})
                card.classList.add('card-active');
                card.scrollIntoView({behavior: "smooth", inline: "center"});
                let value = card.id;
                let position = 6;
                if (parseInt(value.charAt(position))+1){position++;}
                value = value.substr(position);
                const year = value.substr(-4);
                value = value.substr(0, value.length - 4) + ", " + year;
                this.$emit('new-month', value);

            })
        })
    }

}
</script>

<style scoped lang="less">
    .days-selector{
        height: 100px;
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
        overflow-y: auto;
        .days{
            height: 50px;
            display: flex;
        }
    }
    ::-webkit-scrollbar{
        display: none;
    }
</style>
