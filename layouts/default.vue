<template>
  <div class="default">
    <div class="display">
      <mq-layout mq="pc">
        <nuxt />
      </mq-layout>
      <mq-layout mq="tb">
        <div class="errorMsg">
          <p>このページはパソコン版のみ対応です。</p>
          <p>パソコンで表示されない方は、画面サイズを大きくして下さい。</p>
        </div>
      </mq-layout>
    </div>
  </div>
</template>

<style scoped lang="scss">

.default {
  background:rgb(240, 240, 240);
  width:100vw;
  height:100vh;
  padding-top:50px;
}

.display {
  width:800px;
  height:500px;
  border:solid 1px;
  margin:0 auto;
  background:#fff;
  text-align:center;
  position:relative;
}

.errorMsg {
  margin-top:40px;
}

</style>