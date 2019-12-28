<template>
  <div class="add">
      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field v-model="displayName" label="表示名" />
              <p>タイプ名: {{ wordChange }}</p>
              <v-btn @click="regist">
                登録
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-btn to="/">タイトル</v-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      displayName: ''
    }
  },
  methods: {
    regist () {
      const data = {
        displayName: this.displayName,
        typeName: String(this.displayName.replace(/\s+/g, '')).toLowerCase()
      }
      this.$store.dispatch('game/regist', data)
      this.displayName = ''
    }
  },
  computed: {
    wordChange () {
      return String(this.displayName.replace(/\s+/g, '')).toLowerCase()
    }
  }
}
</script>