<template>
  <div class="list">
    <h1>List users social group VK</h1>
    <div class="wrapper">
      <ul>
        <li :for="user in users"
            :key="user.id"
            class="list__item"
        >
          <div class="list__img">

          </div>
          <div class="list__name">
            <span>{{ user.last_name }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'list',
        created(){
          this.$store.dispatch('getUsers')
        },
        data() {
            return {
                dialog: false,
            }
        },
        watch:{

        },
        computed: {
            users(){
                return this.$store.state.roles
            },
        },
        methods:{
            close () {
                this.dialog = false;
            }
        }
    }
</script>