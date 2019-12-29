import firebase from '~/plugins/firebase'
const dataDB = firebase.firestore().collection('data')
const scoreDB = firebase.firestore().collection('score')

export const state = {
  words: [],
  ranking: []
}

export const mutations = {
  dataClear(state) {
    state.words = []
  },
  dataInit(state, payload) {
    state.words.push(payload)
  },
  ranking(state, payload) {
    state.ranking.push(payload)
  },
  rankingInit(state) {
    state.ranking = []
  }
}
export const actions = {
  regist({ }, payload) {
    dataDB.add({
      displayName: payload.displayName,
      typeName: payload.typeName
    }).then(() => {
      alert('登録が完了しました')
    })
  },
  dataClear({ commit }) {
    commit('dataClear')
  },
  dataInit({ commit }) {
    dataDB.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const wordData = {
          displayName: doc.data().displayName,
          typeName: doc.data().typeName
        }
        commit('dataInit', wordData)
      })
    })
  },
  addScore({ }, payload) {
    scoreDB.add({
      userName: payload.name,
      score: payload.score,
      count: payload.count,
      keySpeed: payload.keySpeed
    })
  },
  rankingInit({ commit }) {
    commit('rankingInit')
  },
  ranking({ commit }) {
    scoreDB.orderBy('score', 'desc').limit(5).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const userScore = doc.data()
        commit('ranking', userScore)
      })
    })
  }
}
