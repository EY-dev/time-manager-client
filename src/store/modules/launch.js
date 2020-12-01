import en from '../../assets/Language/en.json'
import ru from '../../assets/Language/ru.json'

export default{
    state: {
        isDark: true,
        showUpdateUI: false,
        isEnglish: true,
        englishDictionary: en.dictionary,
        russianDictionary: ru.dictionary,
        dictionary: null,
        user: null
    },
    mutations: {
        SET_DARK: (state, value) => {
            state.isDark = value;
            localStorage.setItem("theme-app", state.isDark ? 'dark' : 'light');
        },
        SET_UPDATE: (state, value) => {
            state.showUpdateUI = value;
        },
        SET_ENGLISH: (state, value) => {
            state.isEnglish = value;
            state.dictionary = state.isEnglish ? state.englishDictionary : state.russianDictionary;
            localStorage.setItem("historyLanguage", state.isEnglish ? 'english' : 'russian');
        },
        SET_USER_LOCAL: (state, user) => {
            localStorage.setItem("user_name", user.name);
            localStorage.setItem("user_email", user.email);
            localStorage.setItem("user_pwd", user.pwd);
        },
        SET_USER_REMOTE: (state, user) => {
            localStorage.setItem("user_name", user.name);
            localStorage.setItem("user_email", user.email);
            localStorage.setItem("user_pwd", user.pwd);
        },
    },
    actions: {
        setDark: (state, value) => {
            state.commit('SET_DARK', value);
        },
        setUpdate: (state, value) => {
            state.commit('SET_UPDATE', value);
        },
        setEnglish: (state, value) => {
            state.commit('SET_ENGLISH', value);
        },
        setLanguage: (state) => {
            let historyLanguage  = localStorage.getItem("historyLanguage");
            if (historyLanguage !=='russian'){
                state.commit('SET_ENGLISH', true);
            }
            else{
                state.commit('SET_ENGLISH', false);
            }
        },
    },
    getters:{
        isDark: state => {
            return state.isDark;
        },
        isUpdateReady: state => {
            return state.showUpdateUI;
        },
        isEnglish: state => {
            return state.isEnglish;
        },
        getDictionary: state => {
            return state.dictionary;
        },
    },
    modules: {
    }
}
