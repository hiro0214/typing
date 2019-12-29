<template>
  <div class="ranking">
    <h2>ランキングページ</h2>
    <ul>
      <li v-for="(data, index) in $store.state.game.ranking" :key="data">
        <div class="upper-info">
          <strong>{{ index + 1 }}位</strong>
          <div>
            <span>名前: {{ data.userName }}</span>
            <span>スコア: {{ data.score }}pt</span>
          </div>
        </div>
        <div class="lower-info">
          <span>問題数: {{ data.count }}問</span>
          <span>タッチ速度: {{ data.keySpeed }}回/秒</span>
        </div>
      </li>
    </ul>
    <v-btn to="/">トップに戻る</v-btn>
  </div>
</template>

<style scoped lang="scss">

.ranking {
  padding:20px 0;
}

ul {
  list-style: none;
  margin:30px auto;
  li {
    width:60%;
    border-bottom:solid 1px;
    margin:20px auto;
    .upper-info {
      display:flex;
    }
    span {
      width:180px;
      display:inline-block;
      margin:0 20px;
    }
  }
}

</style>

<script>
export default {
  created () {
    this.$store.dispatch('game/rankingInit')
    this.$store.dispatch('game/ranking')
  }
}
</script>