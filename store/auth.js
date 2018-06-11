// import modules and functions
import getEncrypt from '../tool/encrypt'
import Cookie from 'js-cookie'

// get environment variables from nuxt.config.js
const K_TOKEN = process.env.K_TOKEN
const API_PWD_KEY = process.env.API_PWD_KEY
const AUTH_API_URL = process.env.AUTH_API_URL

// ███████╗████████╗ █████╗ ████████╗███████╗
// ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
// ███████╗   ██║   ███████║   ██║   █████╗
// ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝
// ███████║   ██║   ██║  ██║   ██║   ███████╗
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝
export const state = () => ({
    session: null, // String
    rsession: null, // String
    roleId: null, // Integer
})

//  ██████╗ ███████╗████████╗████████╗███████╗██████╗ ███████╗
// ██╔════╝ ██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗██╔════╝
// ██║  ███╗█████╗     ██║      ██║   █████╗  ██████╔╝███████╗
// ██║   ██║██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗╚════██║
// ╚██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║███████║
//  ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝
export const getters = {
    isAuth(state) { // 确认是否有session
        return state.session != null
    }
}

// ███╗   ███╗██╗   ██╗████████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ████╗ ████║██║   ██║╚══██╔══╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// ██╔████╔██║██║   ██║   ██║   ███████║   ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██║╚██╔╝██║██║   ██║   ██║   ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║ ╚═╝ ██║╚██████╔╝   ██║   ██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝     ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
export const mutations = {
    setSession(state, session) {
        state.session = session
    },
    setRsession(state, rsession) {
        state.rsession = rsession
    },
    setRoleId(state, id) {
        state.roleId = id
    },
    clearSession(state) {
        state.session = null
    },
    clearRsession(state) {
        state.rsession = null
    },
    clearRoleId(state) {
        state.roleId = null
    },
}


//  █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
export const actions = {
    authUser({
        commit
    }, {
        user,
        pwd
    }) {
        return this.$axios
            .$post(
                AUTH_API_URL + 'user/login', {
                    user,
                    pwd: getEncrypt(pwd, API_PWD_KEY)
                }, {
                    headers: {
                        'k-token': K_TOKEN,
                        'k-source': 0
                    }
                }
            )
            .then(result => {
                let {
                    session,
                    rsession,
                    roleid
                } = result.data
                //add sesssions to state
                commit('setSession', session)
                commit('setRsession', rsession)
                commit('setRoleId', roleid)
                //add sessions to cookie
                Cookie.set('session', session)
                Cookie.set('rsession', rsession)
                Cookie.set('roleid', roleid)
                return {
                    status: 200,
                    roleid
                }
            })
            .catch(e => {
                return {
                    code: e.response.data,
                    status: e.response.status
                }
            })
    },

    initAuth({
        commit,
        dispatch
    }) {
        let session = Cookie.get('session')
        let rsession = Cookie.get('rsession')
        //if there is no session & rsesson than logout and redirect to login page
        if (!session || !rsession) {
            console.log('%c NO SESSION ', 'background: #ed3f14; color: #FFFFFF')
            dispatch('logout')
        } else {
            commit('setSession', session)
            commit('setRsession', rsession)
        }
    },

    logout({
        commit
    }) {
        // get session and rsession from cookie
        let session = Cookie.get('session')
        let rsession = Cookie.get('rsession')
        //if there's session and ression, init logout api
        if (session && rsession) {
            return this.$axios
                .$post(
                    AUTH_API_URL + '/user/logout', {
                        rsession
                    }, {
                        headers: {
                            'k-session': session
                        }
                    }
                )
                .then(() => {
                    // claer state and cookie
                    commit('clearSession')
                    commit('clearRsession')
                    commit('clearRoleId')
                    Cookie.remove('session')
                    Cookie.remove('rsession')
                    Cookie.remove('roleid')
                    return {
                        status: 200
                    }
                })
                .catch(e => {
                    // claer state and cookie
                    commit('clearSession')
                    commit('clearRsession')
                    commit('clearRoleId')
                    Cookie.remove('session')
                    Cookie.remove('rsession')
                    Cookie.remove('roleid')
                    return {
                        code: e.response.data,
                        status: e.response.status
                    }
                })
        }
        // claer state and cookie
        commit('clearSession')
        commit('clearRsession')
        commit('clearRoleId')
        Cookie.remove('session')
        Cookie.remove('rsession')
        Cookie.remove('roleid')
    }
}
