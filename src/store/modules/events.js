import {FETCH_API_GET, FETCH_API_POST} from "@/plugins/fetchAPI"

export default {
    state: {
        events : []
    },
    mutations : {
        SET_EVENTS: (state, date) => {
            if (!state.events.includes(date)){
                const url = 'events/';
                FETCH_API_GET(url + date).then(events => {
                    if ('error' in events) {
                        throw new Error(events['error']);
                    }
                    if (state.events.length === 0){
                        if (Array.isArray(events)) state.events = events
                    }
                    else{
                        events.forEach(element => {
                            if (!state.events.includes(element)){
                                state.events.push(element)
                            }
                        });
                    }
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
        getEvents: (state, date) => {
            return this.state.events[date]
        }
    },
}
