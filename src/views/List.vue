<template>
  <div class="list">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
    export default {
        name: 'list',
        created(){

        },
        data() {
            return {
                dialog: false,
            }
        },
        watch:{

        },
        computed: {
            roles(){
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