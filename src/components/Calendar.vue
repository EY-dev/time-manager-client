<template>
    <div class="calendar">
        <v-select class="month-selector"
                v-model="title"
                :items="items"
                  menu-props="auto"
                  hide-details
                  @change="changeMonth"
        ></v-select>
        <days-selector @new-month="newCardActive"/>
    </div>
</template>

<script>
import DaysSelector from "@/components/DaysSelector";
export default {
    name: "Calendar",
    components: {DaysSelector},
    data:()=>({
        title: null,
        today: new Date(),
        items: [],
    }),
    methods:{
        fillMonth(year){
            const length = this.items.length;
            for (let i = 0; i < this.$store.getters.getDictionary.home.month.length; i++){
                this.items[length + i] = this.$store.getters.getDictionary.home.month[i] + ', ' + year;
            }
        },
        newCardActive(value){
            this.title = value;
        },
        changeMonth(){
            const activeCard = document.querySelector(".card-active .date");
            const temp = this.title.split(', ');
            const id = 'card-' + activeCard.innerHTML + temp[0] + temp[1];
            const elem = document.getElementById(id);
            let cards = document.querySelectorAll('.day-card');
            cards.forEach(card => {card.classList.remove('card-active')})
            elem.click();
            elem.classList.add('card-active');
            elem.scrollIntoView({inline: "center"});
        },
        newDay(day){
            this.$emit('new-day', day)
        }
    },
    mounted() {

    },
    created() {
        this.fillMonth(this.today.getFullYear()-1);
        this.fillMonth(this.today.getFullYear());
        this.fillMonth(this.today.getFullYear()+1);
        this.title = this.items[12+this.today.getMonth()];
    }
}
</script>

<style lang="less">
    .calendar{
        width: 100%;
        height: 150px;
        cursor: pointer;
        .month-selector{
            width: 258px;
            font-size: 1.5rem;
            padding-left: 25px;
            margin-bottom: 5px;
            .v-select__selection--comma{
                color: var(--link-active) !important;
                height: 22px;
            }
            .v-input__append-inner{
                display: none;
            }
            .v-select__slot:after,.v-input__slot:before{
                content: unset!important;
            }
        }
    }
</style>
