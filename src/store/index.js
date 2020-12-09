import Vue from 'vue'
import Vuex from 'vuex'

import launch from "./modules/launch";
import user from "./modules/user";
import events from "./modules/events"
import date from "./modules/date"

Vue.use(Vuex)

const createStore = () => {
    return new Vuex.Store({
        modules: {
            module1: launch,
            module2: user,
            module3: events,
            module4: date,

        }
    });
};

export default createStore;
