<template>
    <div class="day-schedule">
        <div class="header">
            <h1>Daily activities</h1>
            <div class="action">
                <v-btn class="btn-action" fab small dark @click="getData()">
                    <v-icon>add</v-icon>
                </v-btn>
            </div>
        </div>
        <div class="body-time-line">
            <v-container style="max-width: 600px;" class="time-line">
                <v-timeline dense clipped>
                    <v-slide-x-transition group>
                        <v-timeline-item
                            v-for="event in timeline"
                            :key="event.id"
                            class="mb-4"
                            :class="event.class"
                            color="var(--link)"
                            small
                        >
                            <v-row justify="space-between">
                                <v-col cols="7" v-text="event.text" class="text-left event"></v-col>
                                <v-col class="text-right time-event" cols="5" v-text="event.time"></v-col>
                            </v-row>
                        </v-timeline-item>
                    </v-slide-x-transition>
                </v-timeline>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
    name: "DaySchedule",
    props: ['day'],
    data:()=>({
        date: null,
        activeDay: null,
        input: "",
        events: [],
        isPast: false,
        isNow: false,
        isFuture: false,
        activities: [
            {time: '7:30', text : 'Morning jogging'},
            {time: '8:00', text : 'Shower'},
            {time: '8:30', text : 'Breakfast'},
            {time: '9:00', text : "Project's work"},
            {time: '12:00', text : "Lunch"},
            {time: '12:30', text : "Project's work"},
            {time: '15:00', text : "Gym"},
            {time: '17:00', text : "Dinner"},
            {time: '17:30', text : "Project's work"},
            {time: '20:00', text : "Relax"},
            {time: '23:00', text : "Sleep"},
        ],
        timer: ''
    }),
    methods:{
        newMainFocus(){},
        positionOnTimeLine(time){
            let currentHour = new Date().getHours();
            let currentMinutes = new Date().getMinutes();
            let temp = time.split(':');
            if (currentHour > parseInt(temp[0])){
                return -1;
            }
            if (currentHour < parseInt(temp[0])){
                return 1;
            }
            if (currentHour === parseInt(temp[0])){
                if (temp[1] === "00"){
                    if (currentMinutes < 30){return 0;}
                    else{return -1;}
                }
                if (temp[1] === "30"){
                    if (currentMinutes >= 30){return 0;}
                    else{return 1;}
                }
            }
        },
        setEvent(text, time){
            let event = {};
            const temp = this.positionOnTimeLine(time);
            if (temp < 0){event.class = {'past' : true}}
            if (temp === 0){event.class = {'now' : true}}
            if (temp > 0){event.class = {'future' : true}}
            event.id = this.day + time;
            event.time = time;
            event.text = text;
            return event;
        },
        getTimeLineTime(){
            let result = {};
            let time = ""
            for (let i = 0; i < 24; i++){
                time = i + ":00";
                result = this.activities.filter(activity => activity.time === time);
                if (result.length > 0){this.events.push(this.setEvent(result[0].text, result[0].time));}
                time = i + ":30";
                result = this.activities.filter(activity => activity.time === time)
                if (result.length > 0){this.events.push(this.setEvent(result[0].text, result[0].time));}
            }
        },
        setTimeLineClasses(){
            let now = document.querySelector('.now');
            if (now === null){
                let points = document.querySelectorAll(".past");
                if (points !== null){
                    points[points.length - 1].classList.remove('past');
                    points[points.length - 1].classList.add('now');
                }
            }
        },
        autoRefresh(){
            this.events = [];
            this.getTimeLineTime();
            setTimeout(()=>{
                this.setTimeLineClasses();
                document.querySelectorAll('.now').forEach(box => {box.scrollIntoView({behavior: "smooth", block: "center"})})
            },500);
        },
        getData(){
            fetch('https://service.ey-dev.com/time-manager?def=ghi')
                .then(response => response.json())
                .then(data => console.log(data));

            fetch('https://service.ey-dev.com/time-manager', {
                method: 'POST', // or 'PUT'
                mode: 'cors', // no-cors, *cors, same-origin
                //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"post": 1}),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    },
    computed: {
        timeline () {
            return this.events;
        },
    },
    mounted() {
        this.autoRefresh();
        this.timer = setInterval(this.autoRefresh, 180000);
    },
    created(){
        this.date = this.$store.getters.getCurrentDay
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="less">
.v-application .primary{
    background-color: unset!important;
}
.day-schedule{
    height: calc(100% - 226px);
    width: 100%;
    .header{
        display: flex;
        padding-left: 25px;
        padding-right: 25px;
        h1{
            height: 40px;
            font-size: 1.5rem;
            text-align: left;
            display:flex;
            align-items: center;
            justify-content: center;
            color: var(--link);
            width: 100%;
        }
        .action{
            width: 100%;
            display:flex;
            align-items: center;
            justify-content: flex-end;
            .btn-action{
                background: var(--btn-primary);
            }
        }
    }
    .body-time-line{
        display: block;
        height: calc(100% - 40px);
        width: 100%;
        .time-line{
            overflow-y: auto;
            height: 100%;
            position: relative;
            top:10px;
            .event{
                color: var(--link);
                font-family: 'Architects Daughter', cursive;
                font-size: 1.2rem;
                font-weight: 700;
            }
            .time-event{
                color: var(--active);
                font-family: 'Architects Daughter', cursive;
                font-size: 1.2rem;
            }
            .past .event, .past .time-event{
                color: var(--main-background-lighter);
                text-decoration: line-through;
            }
            .now .event, .now .time-event{
                font-size: 1.5rem;
                color: var(--current);
            }
        }
    }


}
.past{
    .v-timeline-item__inner-dot{
        background-color: var(--link)!important;
    }
}
.now{
    .v-timeline-item__inner-dot{
        background-color: var(--current)!important;
    }
}
.future{
    .v-timeline-item__inner-dot{
        background-color: var(--main-background-lighter)!important;
    }
}
</style>
