<template>
  <div class="about">
    <h2>このゲームについて</h2>
    <ul>
      <li>このゲームはエンジニアがよく使う用語やコマンドをタイピングゲームにしてみました(cssが若干多め)。</li>
      <li>制限時間は90秒です。登録している問題が毎回ランダムで表示されます。</li>
      <li>大文字やスペースは無視して打つ事が出来ます。</li>
      <li>スコアは、問題の文字数 ✖︎ 10ポイントで加算されていきます。<br>問題が出題されてから5秒以内に全て打つ事が出来たら、スコアポイントが2倍で加算されます。</li>
      <li>ランキングページはスコアが上位5位まで表示します。</li>
    </ul>
    <v-btn to="/">トップに戻る</v-btn>
  </div>
</template>

<style scoped lang="scss">

.about {
  padding:20px 0;
}

ul {
  width:71%;
  margin:30px auto;
    text-align:left;
  li {
    margin:10px 0;
  }
}
</style>