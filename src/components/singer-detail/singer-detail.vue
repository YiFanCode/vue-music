<template>
  <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  created() {
    this._getDetail()
  },
  methods: {
    async _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      // const singerId = this.singer ? this.singer.id : this.id
      // console.log(singerId)

      const res = await getSingerDetail(this.singer.id)
      if (res.code === ERR_OK) {
        this.songs = this._normalizeSongs(res.data.list)
        // console.log(this.songs)
      }
    },

    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>