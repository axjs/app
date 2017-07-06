<template>
  <f7-page>
    <f7-progressbar v-if="busy"
                    infinite></f7-progressbar>
    <f7-fab v-if="!busy"
            color="pink"
            @click="add">
      <f7-icon icon="icon-plus"></f7-icon>
    </f7-fab>

    <f7-navbar back-link="Back"
               :title="'Dict '+key"
               sliding></f7-navbar>
    <!-- <f7-block-title co>List</f7-block-title> -->
    <f7-list contacts>
      <f7-list-item swipeout
                    :link="['/edit/?ref=', key, '&key=', item['.key']].join('')"
                    :key="item['.key']"
                    v-for="item in items"
                    :title="item.name || item.title"
                    :badge="item['.key']"
                    badge-color="red">
        <f7-swipeout-actions left>
          <f7-swipeout-button close
                              color="red"
                              @click="remove(item)">Delete</f7-swipeout-button>
        </f7-swipeout-actions>

        <f7-swipeout-actions>
          <f7-swipeout-button close
                              color="blue"
                              @click="clone(item)">Clone</f7-swipeout-button>
        </f7-swipeout-actions>

      </f7-list-item>
    </f7-list>

  </f7-page>
</template>
<script>
  export default {
    name: 'DictList',

    data: function () {
      return {
        busy: false
      }
    },

    // firebase: {
    //   items: window.firebase.database().ref('null')
    // },

    computed: {
      key: function () {
        if (!this.$route.query ||
          !this.$route.query.ref) {
          this.$f7.alert('Query error', 'Error')
          return
        }
        var key = this.$route.query.ref

        this.busy = true
        this.$bindAsArray('items',
          window.db(key),
          (error) => {
            this.$f7.alert(error.message, 'Error ' + error.code)
            this.busy = false
          },
          () => {
            this.busy = false
          })
        return key
      }
    },

    methods: {
      add: function () {
        console.log('add')
        this.$firebaseRefs.items.push({
          name: 'ax'
        })
      },

      remove: function (item) {
        this.$firebaseRefs.items.child(item['.key']).remove()
      },

      clone: function (item) {
        var res = JSON.parse(JSON.stringify(item))
        if (!res ||
          !res['.key'] ||
          res['.value'] === null) {
          console.log('Error res', res)
          this.$f7.alert('Wrong data', 'Error')

          return
        }
        delete res['.key']

        this.$firebaseRefs.items.push(res)
      }
    },

    beforeMount: function () {
      this.$bindAsArray('items', window.db('null'))
      this.key = this.$route.hash
    }
  }

</script>
