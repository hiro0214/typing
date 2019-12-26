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
        <div v-show="timeBar" class="timebar"></div>
      </transition>
      <p>残り時間:{{ timer }}秒</p>
      <p class="displayname">{{ displayName }}</p>
      <p class="typename">{{ typeName }}</p>
      <p>{{ count }}問目</p>
      <p>ミスタッチ:{{ missCount }}回</p>
      <p v-show="finish" class="finish">終了!!</p>
    </div>

    <div v-else-if="gameInfo == 'result'">
      <p>{{ userName }}さんの結果</p>
      <p>問題数: {{ count }}</p>
      <p>タッチ速度: {{ keySpeed }}</p>
      <p>ミスタッチ回数: {{ missCount }}</p>
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
  border-bottom:solid 1px;
  margin-top:150px;
}

.typename {
  font-size:30px;
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
  animation-duration: 10s;
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

</style>

<script>
export default {
  data () {
    return {
      words: [
        { displayName: 'Vue.js', typeName: 'vue.js'},
        { displayName: 'Nuxt.js', typeName: 'nuxt.js'},
        { displayName: 'Java Script', typeName: 'javascript'},
        { displayName: 'jQuery', typeName: 'jquery'},
        { displayName: 'React', typeName: 'react'},
        { displayName: 'margin: 0 auto;', typeName: 'margin:0auto;'},
        { displayName: 'git pull origin master', typeName: 'gitpulloriginmaster'},
        { displayName: 'Hyper Text Markup Language', typeName: 'hypertextmarkuplanguage'},
        { displayName: 'text-align: center;', typeName: 'text-align:center;'},
        { displayName: 'flex-wrap: wrap;', typeName: 'flex-wrap:wrap;'},
        { displayName: 'mysql -u root -p', typeName: 'mysql-uroot-p'},
        { displayName: 'position: absolute;', typeName: 'position:absolute;'},
        { displayName: '<p>Hello World!</p>', typeName: '<p>helloworld!</p>'},
        { displayName: 'ps aux | grep unicorn', typeName: 'psaux|grepunicorn'},
        { displayName: 'Aws Web Servise', typeName: 'awswebservice'}
        // { displayName: '', typeName: ''},
      ],
      gameInfo: 'open',
      typeList: [],
      displayName: '',
      typeName: '',
      count: 1,
      successKey: 0,
      missCount: 0,
      setTimer: null,
      timer: 90,
      timeBar: false,
      // timeBarCount: 10,
      finish: false,
      userName: ''
    }
  },
  methods: {
    start () {
      this.init()
      let words = this.words
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
      this.timer = 5
      this.setTimer = null
      this.timeBar = true
      this.finish = false
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
          this.questionClear()
          this.question(this.count)
        }
      }
    },
    timerDown () {
      this.timer -= 1
    },
    question (num) {
      this.displayName = this.typeList[num - 1].displayName
      this.typeName = this.typeList[num - 1].typeName
      // this.$store.dispatch('game/setTimeBar')
    },
    questionClear () {
      this.count ++
      // this.$store.dispatch('game/clearTimeBar')
      this.timeBar = false

      // this.timeBar = false
      // document.getElementById('timerbar').remove(".timebar")
      // const timeBarDom = this.$refs.timebar
      // timeBarDom.remove()
      // const boxDom = this.$refs.box
      // boxDom.add(timeBarDom)
    },
    setTimebar () {
      alert('set')
    },
    clearTimebar () {
      alert('clear')
    },
    // timeBarCount() {
    //   this.timeBarCount -= 1
    // },
    gameFinish () {
      // this.timeBar = false
      this.finish = true
      window.removeEventListener('keydown', this.typingCheck)
      setTimeout(this.result, 3000)
    },
    result () {
      this.gameInfo = 'result'
    }
  },
  computed: {
    keySpeed () {
      return this.successKey / 10
    },
  },
  watch: {
    // timeBar(val) {
    //   if(val === true) {
    //     this.setTimebar()
    //   } else if (val === false) {
    //     this.clearTimebar()
    //   }
    // }
    timer(val) {
      if ( val === 0 ) {
        clearInterval(this.setTimer)
        this.gameFinish()
      }
    }
  }
}
</script>
