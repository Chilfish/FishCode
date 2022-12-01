<template>
  <div class="shopping-cart">
    <h1>My Cart</h1>
    <div class="cart-info">
      <ul>
        <li v-for="item in shopping" :key="item.id">
          <span>{{ item.name }} </span>
          <div class="btn">
            <button @click="changeCount('reduce', item)">-</button>
            <span>{{ item.count }} </span>
            <button @click="changeCount('add', item)">+</button>
          </div>
          <span>${{ item.price * item.count }}</span>
          <button @click="delCart(item)">delete</button>
        </li>
      </ul>
      <!-- <div class="moneySum">Sum: {{ moneySum }}</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { Product } from 'src/interface';
import { useStore } from 'src/store';

const { state, commit } = useStore(),
  shopping = computed(() => state.shopping);

const changeCount = (type: string, data: Product) => {
  if (type === 'reduce' && data.count <= 1) return;
  commit('CHANGE_COUNT', { type, data });
  commit('SUM_MONEY', data);
};
const delCart = (data: Product) => {
  if (confirm('confirm to delete?')) {
    commit('DEL_BY_ID', data.id);
  }
};
</script>

<style scoped>
@import url('../index.css');

.btn {
  width: 10em;
  display: inline-block;
}
.btn span {
  width: 3em;
  margin: 0 0.5em;
}
.btn button {
  display: inline-block;
  width: 2em;
}

.moneySum {
  margin: 3em;
  font-size: 1.3em;
  font-weight: bold;
}
</style>
