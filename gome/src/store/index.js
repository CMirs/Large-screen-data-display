import Vue from 'vue'
import Vuex from 'vuex'

// 使用vuex
Vue.use(Vuex);

// 创建vuex实例 
const store = new Vuex.Store({
    state: {
        count: 1
    },
    getters: { //类似于vue的computed
        getStateCount(state) {
            return state.count + 1;
        }

    },
    /*
    Mutation：专注于修改State，理论上是修改State的唯一途径。
              必须同步执行
    */ 
    mutations: {
        add(state) { //上面定义的state对象 
            state.count = state.count + 1
        },
        reduction(state,n) {
            state.count = state.count - n
        }
    },
    /*
    Action：业务代码、异步请求。
    Action：可以异步，但不能直接操作State。
    */ 
    actions: { //注册actions,类似vue里面的methods 
        addFun(context) {//接收一个与store实力具有相同方法的属性context对象
            context.commit('add');
        },
        reductionFun(context,n){
            context.commit('reduction',n)
        }

    }
})

export default store