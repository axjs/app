<template>
  <f7-page>
    <f7-progressbar v-if="busy"
                    infinite></f7-progressbar>
    <f7-navbar back-link="Back"
               :title="key"
               sliding>
      <f7-nav-right>
        <f7-link icon-f7="check"
                 @click="save(item)">Save</f7-link>
      </f7-nav-right>
    </f7-navbar>
    <input type="file"
           id="file"
           name="file"
           @change="handleFileSelect" />
    <form-fields v-if="item"
                 :fields="fields"
                 :item="item"></form-fields>
  </f7-page>
</template>
<script>
  import FormFields from './form-fields.vue'

  export default {
    name: 'DictEdit',

    data: function () {
      return {
        // item: {},
        // key: '',
        busy: false,
        fields: [
          {
            label: 'Name',
            type: 'text',
            key: 'name'
          },
          {
            label: 'Last Name',
            type: 'text',
            key: 'lastName',
            default: 'Last Name'
          },
          {
            label: 'Age',
            type: 'text',
            key: 'age',
            default: 3
          },
          {
            label: 'Switch',
            type: 'switch',
            key: 'switch',
            default: true
          },
          {
            label: 'Select',
            type: 'select',
            key: 'select',
            default: '3',
            options: [
              { value: 1, text: 'USD' },
              { value: 2, text: 'EUR' },
              { value: 3, text: 'UAH' }
            ]
          },
          {
            label: 'Color',
            type: 'color',
            key: 'color',
            default: '#03ff00'
          }
        ]

      }
    },
    computed: {
      key: function () {
        if (!this.$route.query ||
          !this.$route.query.ref ||
          !this.$route.query.key) {
          this.$f7.alert('Query error', 'Error')
          return
        }
        var key = this.$route.query.ref + '/' + this.$route.query.key // this.$route.hash
        // this.$firebaseRefs && this.$firebaseRefs.item && this.$unbind('item')
        this.$bindAsObject('item', window.firebase.database().ref(key), () => console.log('Cancel fired!'), () => console.log('Ready fired!'))
        return key
      }
    },

    methods: {
      handleFileSelect: function (evt) {
        console.log('handleFileSelect', evt)
        evt.stopPropagation()
        evt.preventDefault()

        var file = evt.target.files[0]
        var metadata = {
          'contentType': file.type
        }
        window.firebase.storage().ref().child('images/' + file.name).put(file, metadata).then(function (snapshot) {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.')
          console.log(snapshot.metadata)
          var url = snapshot.metadata.downloadURLs[0]
          console.log('File available at', url)
        }).catch(function (error) {
          console.error('Upload failed:', error)
        })
      },

      save: function (value) {
        var vm = this
        var res = JSON.parse(JSON.stringify(value))
        console.log('res', res, value)
        if (!res ||
          !res['.key'] ||
          res['.value'] === null) {
          console.log('Error res', res)
          vm.$f7.alert('Wrong data', 'Error')

          return
        }
        delete res['.key']

        window.firebase.database().ref(this.key).set(res)
          .then(function () {
            console.log('Synchronization succeeded')
          })
          .catch(function (error) {
            console.log('Synchronization failed', error)
            vm.$f7.alert(error, 'Firebase')
          })
      }

    },

    components: {
      'form-fields': FormFields
    }
  }

</script>
