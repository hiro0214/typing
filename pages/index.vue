<template>
  <div>
    <h1>Typing!</h1>
    <div class="gameStart">
      <v-btn to="/game">ゲームスタート!</v-btn>
    </div>

    <div class="other">
      <v-btn to="/about">ルール</v-btn>
      <v-btn to="/ranking">ランキング</v-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">

h1 {
  margin:50px 0 120px;
  font-size:60px;
}

.gameStart {
  margin-bottom:30px;
}

.other {
  a {
    margin:0 30px;
  }
}

</style>