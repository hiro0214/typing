import firebase from '~/plugins/firebase'
const db = firebase.firestore().collection('data')

export const state = {
  words: []
}

export const mutations = {
  dataInit(state, payload) {
    state.words.push(payload)
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
  }
}

export const getters = {
}