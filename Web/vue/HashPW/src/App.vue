<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h1>在线 Hash 密码生成器</h1>
      </el-header>
      <el-main>
        <p>
          无后端，纯本地生成，输入网站域名或应用名称以及您自定义的私钥（盐），即可生成专属的
          Hash 密码
        </p>
        <el-alert
          title="基于 Hash 的特性，每次相同的输入得到的也实现相同的结果，就算不输入，也能得到一个固定的值
        "
          type="info"
          show-icon
        />
        <InputGen />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import InputGen from './components/InputGen.vue';
</script>

<style lang="scss">
#app {
  font-family: 'Hiragino Sans GB';
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

h1 {
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eaecef;
}

.common-layout {
  max-width: 60vw;
}
@media screen and (min-width: 300px) {
  .common-layout {
    max-width: 85vw;
  }
}
</style>
