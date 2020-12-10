

export default {
    state: {
        today : new Date(),
        currentDay: new Date()
    },
    mutations : {
        SET_CURRENT_DAY : (state, day) => {
            state.currentDay = day
        }
    },
    actions: {
        setCurrentDay : (state, date) => {
            state.commit('SET_CURRENT_DAY', date)
        }
    },
    getters: {
        getToday: state => {
            return state.today
        },
        getCurrentDay: state => {
            return state.currentDay
        }
    },
}
