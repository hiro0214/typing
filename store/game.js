import firebase from '~/plugins/firebase'
const db = firebase.firestore().collection('data')

export const state = {
  words: [],
  ranking: []
}

export const mutations = {
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
    db.add({
      displayName: payload.displayName,
      typeName: payload.typeName
    }).then(() => {
      alert('登録が完了しました')
    })
  },
  dataInit({ commit }) {
    db.get().then((querySnapshot) => {
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
    firebase.firestore().collection('score').add({
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
    firebase.firestore().collection('score').orderBy('score', 'desc').limit(5).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const userScore = doc.data()
        commit('ranking', userScore)
      })
    })
  }
}
