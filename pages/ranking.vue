<template>
  <div class="ranking">
    <h2>ランキングページ</h2>
    <ul>
      <li v-for="(data, index) in datas" :key="data">
        <div class="upper-info">
          <strong>{{ index + 1 }}位</strong>
          <span>名前: {{ data.name }}</span>
          <span>スコア: {{ data.score }}</span>
        </div>
        <div class="lower-info">
          <span>問題数: {{ data.question }}</span>
          <span>タッチ速度: {{ data.keyspeed }}</span>
        </div>
      </li>
    </ul>
    <v-btn to="/">トップに戻る</v-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas: [
        {name: '田中', score: '2000', question: '10', keyspeed: '5.0'},
        {name: '山田', score: '1500', question: '8', keyspeed: '3.0'},
        {name: '佐藤', score: '2200', question: '12', keyspeed: '5.8'},
        {name: '鈴木', score: '1200', question: '6', keyspeed: '2.9'},
        {name: '坂本', score: '1900', question: '9', keyspeed: '4.6'},
      ]
    }
  }
}
</script>

<style scoped lang="scss">

.ranking {
  padding:20px 0;
}

ul {
  list-style: none;
  margin:30px auto;
  li {
    width:50%;
    border-bottom:solid 1px;
    margin:20px auto;
  }
}

</style>