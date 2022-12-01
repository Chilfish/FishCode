import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { Product } from 'src/interface';

export interface State {
  shopping: Product[];
}

// 创建唯一类型key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    shopping: [],
  },

  getters: {
    isInCart(state) {
      return (data: any) => {
        return state.shopping.findIndex((item) => item.id === data.id) > -1
          ? true
          : false;
      };
    },
  },

  mutations: {
    ADD_TO_CART(state, data) {
      state.shopping.push(data);
    },

    CHANGE_COUNT(state, { type, data }) {
      return state.shopping.map((item) => {
        if (data.id === item.id) {
          item.count += type === 'add' ? 1 : -1;
        }
        return item;
      });
    },

    SUM_MONEY(state, data) {},

    DEL_BY_ID(state, id) {
      state.shopping = state.shopping.filter((item) => item.id !== id);
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
