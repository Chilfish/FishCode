<template>
  <el-row>
    <el-input
      v-model="domain"
      placeholder="如：organicfish.top（不分中英文）"
      clearable
    >
      <template #prepend>域名或应用名：</template>
    </el-input>
  </el-row>

  <el-row>
    <el-input
      v-model="salt"
      type="password"
      placeholder="如：2333"
      show-password
      clearable
    >
      <template #prepend>盐值</template>
    </el-input>
  </el-row>

  <el-row class="ans-row">
    <span>生成长度：</span>
    <el-input-number
      v-model="len"
      :min="6"
      :max="20"
      controls-position="right"
    />
    <el-button plain type="primary" round @click="generate"
      >生成 hash 码</el-button
    >
  </el-row>

  <el-row class="box-card">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>Hash 码</span>
        </div>
      </template>
      <div v-for="value in outArr" class="text">
        {{ value }}
      </div>
    </el-card>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Md5 } from 'ts-md5';
import { encode } from 'js-base64';

const domain = ref(''),
  salt = ref(''),
  len = ref('');
let outArr: String[];

function generate() {
  outArr = [];
  const range = Number(len.value);
  const md5 = Md5.hashStr('https://' + domain.value + '/' + salt.value);
  const base = encode(md5 + len.value),
    T = Math.floor(base.length / range);

  for (let i = 0, start = -range; i < T; ++i) {
    start += range;
    const out = base.slice(start, start + range);
    outArr.push(out);
  }
  console.log(outArr);
}
</script>

<style lang="scss">
.el-row {
  margin: 2rem auto;
}

.ans-row {
  & > span {
    line-height: 2rem;
  }
  & > .el-input-number {
    width: 5rem;
    margin: auto 1rem;
  }
}

.card-header {
  text-align: center;
}

.text {
  font-size: 14px;
  margin-bottom: 18px;
}

.box-card {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-card {
    width: 480px;
  }
}
</style>
