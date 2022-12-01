<template>
  <h1>Products</h1>
  <div class="products">
    <div v-if="!loading">
      <ul>
        <li v-for="(item, index) in products" :key="index">
          <span class="name">{{ item.name }}</span>
          <span class="value">${{ item.price }}</span>
          <button @click="addToCart(item)">adding</button>
        </li>
      </ul>
    </div>
    <div class="loading" v-else></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Product } from 'src/interface';
import { apiGetProducts } from 'src/api';
import { useStore } from 'src/store';

const products = ref<Product[]>([]),
  loading = ref<boolean>(false),
  { commit, getters } = useStore();

// get products list
const getProducts = async () => {
  loading.value = true;
  products.value = await apiGetProducts();
  loading.value = false;
};

// add to cart
const addToCart = (product: Product) => {
  const data = {
    name: product.name,
    id: product.id,
    count: product.count,
    price: product.price,
  };
  if (!getters.isInCart(product)) {
    commit('ADD_TO_CART', data);
  } else {
    commit('CHANGE_COUNT', { type: 'add', data: data });
  }
  commit('SUM_MONEY', data);
  console.log('adding...');
};

getProducts();
</script>

<style>
@import url('../index.css');
.loading {
  width: 2em;
  height: 2em;
  background: url('../img/loading.svg') no-repeat;
  background-size: 100%;
  margin: 0 auto;
  transition: all ease-in-out 0.4s;
}
</style>
