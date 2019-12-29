<template>
  <div class="home">

    <div v-if="gameInfo == 'open'" class="type">
      <p>ニックネームを入力してください</p>
      <v-text-field v-model="userName" />
      <v-btn v-if="userName" @click="start">スタート!</v-btn>
      <v-btn v-else disabled>スタート!</v-btn>
      <div class="topBack">
        <v-btn to="/">トップに戻る</v-btn>
      </div>
    </div>

    <div v-else-if="gameInfo == 'game'">
      <transition name="timebar" appear>
        <div v-show="flag" class="timebar"></div>
      </transition>
      <p>残り時間:{{ timer }}秒</p>
      <p class="displayname">{{ displayName }}</p>
      <p class="typename">{{ typeName }}</p>
      <p>score:{{ score }}</p>
      <p>{{ count }}問目</p>
      <p>ミスタッチ:{{ missCount }}回</p>
      <p v-show="finish" class="finish">終了!!</p>
    </div>

    <div v-else-if="gameInfo == 'result'" class="result">
      <h2>Result</h2>
      <p>{{ userName }}さんの結果</p>
      <ul>
        <li><span>問題数</span><span>{{ count }}問</span></li>
        <li><span>score</span><span>{{ score }}pt</span></li>
        <li><span>タッチ速度</span><span>{{ keySpeed }}回/秒</span></li>
        <li><span>ミスタッチ回数</span><span>{{ missCount }}回</span></li>
      </ul>
      <v-btn @click="start">もう1度</v-btn>
      <div class="topBack">
        <v-btn to="/">トップに戻る</v-btn>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">

.displayname {
  font-size:50px;
  margin-top:150px;
}

.typename {
  font-size:30px;
  border-top: solid 1px;
  &::first-letter {
    color:rgb(255, 77, 45);
  }
}

.topBack {
  margin-top:50px;
}

.timebar {
  width:100%;
  height:25px;
  background:rgb(200, 200, 200);
  animation-name: timeBar;
  animation-duration: 90s;
  animation-timing-function: linear;
  // animation-iteration-count: infinite;
  animation-direction: reverse;
}

@keyframes timeBar {
  from {
    width:0%;
  }
  to {
    width:100%;
  }
}

.type {
  width:300px;
  height:100px;
  background:#fff;
  margin:20px auto;
}

.finish {
  color:red;
  font-size:80px;
  font-weight:600;
  position:absolute;
  left:40%;
  bottom:170px;
}

.result {
  padding:20px 0;
  p {
    margin-top:20px;
  }
  ul {
    width:28%;
    list-style:none;
    margin:30px auto 60px;
    li {
      display:flex;
      justify-content:space-between;
      > span {
        display:block;
      }
    }
  }
}

</style>

<script>
export default {
  created () {
    this.$store.dispatch('game/dataInit')
  },
  data () {
    return {
      gameInfo: 'open',
      typeList: [],
      displayName: '',
      typeName: '',
      count: 1,
      successKey: 0,
      missCount: 0,
      timer: 90,
      setTimer: null,
      bonusCount: 5,
      setBonus: null,
      score: 0,
      flag: false,
      finish: false,
      userName: ''
    }
  },
  methods: {
    start () {
      this.init()
      let words = this.$store.state.game.words
      words = words.map(function(a){return [a, Math.random()]})
            .sort(function(a, b){return a[1] - b[1]})
            .map(function(a){return a[0]});
      words.forEach((doc) => {
        this.typeList.push(doc)
      })
      window.addEventListener('keydown', this.typingCheck)
      this.setTimer = setInterval(this.timerDown, 1000)
      this.question(this.count)
    },
    init () {
      this.gameInfo = 'game'
      this.typeList = []
      this.count = 1
      this.successKey = 0
      this.missCount =  0
      this.timer = 90
      this.score = 0
      this.setTimer = null
      this.flag = true
      this.finish = false
      this.setBonus = setInterval(this.bonusDown, 1000)
    },
    typingCheck (e) {
      let type = e.key
      if (type !== ' ') {
        if (type === this.typeName.charAt(0)) {
          this.typeName = this.typeName.slice(1)
          this.successKey ++
        } else {
          this.missCount ++
        }
        if (this.typeName.length === 0 ) {
          if (this.bonusCount > 0) {
            this.score += (String(this.displayName.replace(/\s+/g, '')).length) * 10 * 2
          } else {
            this.score += (String(this.displayName.replace(/\s+/g, '')).length) * 10
          }
          this.questionClear()
          this.question(this.count)
        }
      }
    },
    timerDown () {
      this.timer -= 1
    },
    bonusDown () {
      this.bonusCount -= 1
    },
    question (num) {
      this.displayName = this.typeList[num - 1].displayName
      this.typeName = this.typeList[num - 1].typeName
    },
    questionClear () {
      this.count ++
      this.bonusCount = 5
    },
    gameFinish () {
      this.finish = true
      window.removeEventListener('keydown', this.typingCheck)
      setTimeout(this.result, 3000)
    },
    result () {
      this.gameInfo = 'result'
      this.flag = false
      const userScore = {
        name: this.userName,
        score: this.score,
        count: this.count,
        keySpeed: (this.successKey / 90).toFixed(1)
      }
      this.$store.dispatch('game/addScore', userScore)
    }
  },
  computed: {
    keySpeed () {
      return (this.successKey / 90).toFixed(1)
    }
  },
  watch: {
    timer(val) {
      if ( val === 0 ) {
        clearInterval(this.setTimer)
        clearInterval(this.setBonus)
        this.gameFinish()
      }
    }
  }
}
</script>
