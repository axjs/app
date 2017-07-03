<template>
  <f7-page>
    <f7-fab color="pink"
            @click="addItem">
      <f7-icon icon="icon-plus"></f7-icon>
    </f7-fab>

    <f7-navbar back-link="Back"
               :title="'Dict '+key"
               sliding></f7-navbar>
    <!-- <f7-block-title co>List</f7-block-title> -->
    <f7-list contacts>
      <f7-list-item swipeout
                    :link="'/edit#'+key+'/'+item['.key']"
                    :key="item['.key']"
                    v-for="item in items"
                    :title="item.name || item.title"
                    :badge="item['.key']"
                    badge-color="red">
        <f7-swipeout-actions>
          <f7-swipeout-button delete
                              @click="removeItem(item)">Delete</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>
<script>
  console.log('list.vue')

  export default {
    name: 'ListFB',

    data: function () {
      return {
        key: ''
      }
    },

      // firebase: {
      //   items: window.firebase.database().ref('null')
      // },

    watch: {
      key: function (value, oldValue) {
        if (value === oldValue) {
          return
        }

        console.log('key changed', value, oldValue)
        this.$firebaseRefs && this.$firebaseRefs.items && this.$unbind('items')
        this.$bindAsArray('items', window.db(value))
      }
    },

    methods: {
      addItem: function () {
        console.log('add')
        this.$firebaseRefs.items.push({
          name: 'ax'
        })
      },
      removeItem: function (item) {
        this.$firebaseRefs.items.child(item['.key']).remove()
      }
    },

    beforeMount: function () {
      this.$bindAsArray('items', window.db('null'))
      this.key = this.$route.hash
    }
  }

</script>
