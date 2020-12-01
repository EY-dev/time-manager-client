import Vue from 'vue'
import Vuex from 'vuex'

import launch from "./modules/launch";
import user from "./modules/user";

Vue.use(Vuex)

const createStore = () => {
    return new Vuex.Store({
        modules: {
            module1: launch,
            module2: user

        }
    });
};

export default createStore;
