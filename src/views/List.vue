<template>
  <div class="list__container">
    <h1>List my instagram photos</h1>

    <div @scroll="onScroll"
         class="list__wrapper" >

      <div class="list__loading" v-if="loading">
        <font-awesome-icon icon="spinner" spin size="6x" />
      </div>

      <ul class="list">
        <li v-for="(photo, index) in photos"
            :key="photo.id + index"
            class="list__item"
        >
          <div class="list__media">
            <video v-if="photo.type == 'video'"
                   :src="photo.videos.low_resolution.url"
                   controls
            ></video>
            <img v-else
                 :src="photo.images.low_resolution.url"
                 :alt="photo.caption.text"
            >
          </div>
          <div class="list__info">
            <span>{{ photo.caption.text }}</span>
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
    export default {
        name: 'list',
        data() {
            return {
                loading: false,
            }
        },
        mounted() {
          if (this.$store.state.photos.length < 1)
            this.$store.dispatch('getPhotos')
        },
        computed: {
            photos(){
                return this.$store.state.photos
            },
        },
        methods:{
            onScroll (event) {
              var wrapper = event.target
              var list = wrapper.firstElementChild

              var scrollTop = wrapper.scrollTop
              var wrapperHeight = wrapper.offsetHeight
              var listHeight = list.offsetHeight

              var diffHeight = listHeight - wrapperHeight

              if (diffHeight <= scrollTop && !this.loading) {
                //instagram API sendbox allows to ship no more than 20 photos

                let nextUrl = this.$store.state.nextUrl
                this.loading = true
                this.$store.dispatch('getPhotos', nextUrl).then( result => {
                    this.loading = false
                })
              }

            }
        }
    }
</script>

<style>
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  .list__container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .list__wrapper{
    width: 500px;
    height: 80vh;
    background-color: #35495e;
    overflow: scroll;
    overflow-x: hidden;
    position: relative;
  }
  .list__loading{
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .list{
    padding: 0;
    margin: 0;
    list-style: none;
    padding-top: 24px;
  }
  .list__item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
  }
  .list__info{
    width: 320px;
    color: white;
    font-size: 16px;
    margin-top: 10px;
  }
  .list__media{
    width: 320px;
  }
  .list__media video {
    width: 320px;
  }
</style>