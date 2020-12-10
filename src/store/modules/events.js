import {FETCH_API_GET, FETCH_API_POST} from "@/plugins/fetchAPI"
export default {
    state: {
        events : {},
    },
    mutations : {
        SET_EVENTS: (state, date) => {
            const id = localStorage.getItem("user_id");
            if (Object.keys(state.events).length === 0  || state.events[date] === undefined){
                    const url = 'events/' + id + '/';
                    FETCH_API_GET(url + date).then(events => {
                        if ('error' in events) {
                            throw new Error(events['error']);
                        }
                        if (Object.keys(state.events).length === 0){
                            for (date in events){
                                state.events[date] = events[date]
                            }
                        }
                        else{
                            for (date in events){
                                if (!(date in Object.keys(state.events))){
                                    state.events[date] = events[date]
                                }
                            }
                        }
                        state.events = JSON.parse(JSON.stringify(state.events))
                    })
                }
        },
        UPDATE_EVENTS: (state, {date, event}) => {
            const url = 'events/' + event['id']
            FETCH_API_POST(url, event).then(status => {
                if ('error' in status){
                    throw new Error(status['error']);
                }
                const oldEvent = state.events[date].find(element => element['id'] === event['id'])
                const index = state.events[date].indexOf(oldEvent)
                state.events[date][index] = event
            })
        }
    },
    actions: {
        updateEvent: (state, {date, event}) => {
            state.commit('UPDATE_EVENTS', {date, event})
        },
        setEvents: (state, date) => {
            state.commit('SET_EVENTS', date)
        }
    },
    getters: {
        getEvents: (state) => {
            return state.events
        }
    },
}
