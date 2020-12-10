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
                            :class="getClass(event)"
                            color="var(--link)"
                            small
                        >
                            <v-row justify="space-between">
                                <v-col cols="7" v-text="event.title" class="text-left event"></v-col>
                                <v-col class="text-right time-event" cols="5" v-text="timeToString(event['time_from'])+'-'+timeToString(event['time_to'])"></v-col>
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
        activities: [
            {time: '7:30', title : 'Morning jogging'},
            {time: '8:00', title : 'Shower'},
            {time: '8:30', title : 'Breakfast'},
            {time: '9:00', title : "Project's work"},
            {time: '12:00', title : "Lunch"},
            {time: '12:30', title : "Project's work"},
            {time: '15:00', title : "Gym"},
            {time: '17:00', title : "Dinner"},
            {time: '17:30', title : "Project's work"},
            {time: '20:00', title : "Relax"},
            {time: '23:00', title : "Sleep"},
        ],
        timer: ''
    }),
    methods:{
        timeToString(time){
            time = time.split(':')
            return time[0] + ':' + time[1]
        },
        getClass(event){
            if (event['is_complete'] === 1){
                return {'past' : true}
            }
            else{
                const now = new Date()
                if (now < new Date(event['date'] + ' ' + event['time_to']) && now > new Date(event['date'] + ' ' + event['time_from'])){
                    return {'now' : true}
                }
                else{
                    return {'future' : true}
                }
            }
        },
        autoRefresh(){
            this.timeline
            setTimeout(()=>{
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
            return this.$store.getters.getEvents[this.currentDay];
        },
        currentDay(){
            return this.$store.getters.getCurrentDay
        }
    },
    mounted() {
        this.autoRefresh();
        this.timer = setInterval(this.autoRefresh, 1000);
        //this.timer = setInterval(this.autoRefresh, 180000);
    },
    created(){
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
