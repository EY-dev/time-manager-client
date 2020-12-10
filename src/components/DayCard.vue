<template>
    <div class="day-card" :class="{'card-active':isActive, 'current-day': isActive}" @click="newDate">
        <h1 class="date">{{ date.date }}</h1>
        <h2 class="day">{{ $store.getters.getDictionary.home.weeks[date.dayOfWeek] }}</h2>
    </div>
</template>

<script>

function dateToStr(date){
    let full_date =  date.year + '-'
    full_date += (date.month + 1 < 10) ? '0' + (date.month + 1) + '-' : (date.month + 1) + '-'
    full_date += (date.date < 10) ? '0' + (date.date) : (date.date)
    return full_date
}

export default {
    name: "DayCard",
    props: ["day"],
    data: ()=>({
        date: {},
        isActive:false
    }),
    methods:{
        newDate(){
            let id = 0
            try {
                id = parseInt(this.$store.getters.getUser.id)
            }
            catch (error){
                this.$router.push('/login')
            }
            if (id > 0){
                this.$store.dispatch('setCurrentDay', dateToStr(this.date))
                this.$store.dispatch('setEvents', dateToStr(this.date))
            }
        }
    },
    mounted() {
        const today = new Date();
        if (today.getDate() === this.date.date && today.getMonth() === this.date.month && today.getFullYear() === this.date.year){
            this.isActive = true;
            const id = '#card-' + this.date.date + this.$store.getters.getDictionary.home.month[this.date.month] + this.date.year;
            const elems = document.querySelectorAll(id);
            elems.forEach(elem => {
                elem.scrollIntoView({inline: "center"});
            })
            this.newDate()
        }
    },
    created() {
        this.date = this.day;
    }
}
</script>

<style scoped lang="less">
    .day-card{
        min-width: 40px;
        height: 50px;
        margin-right: 5px;
        background-color: var(--main-background-lighter);
        border-radius: 5px;
        color: var(--link);
        cursor: pointer;
        h1{
            font-size: 1.3rem;
        }
        h2{
            font-size: 0.8rem;
        }
        h1, h2{
            pointer-events: none;
        }

    }
    .card-active{
        min-width: 60px;
        height: 70px;
        h1{
            font-size: 1.9rem;
        }
        h2{
            font-size: 1.1rem;
        }
        h1, h2{
            pointer-events: none;
        }
    }
    .current-day{
        background-color: var(--current) !important;
        color: var(--main-background) !important;
    }
</style>
