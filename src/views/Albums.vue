<template>
  <div>
    <h3 class="text-3xl">Create Or Choose An Album</h3>
    <div class="flex flex-col m-auto w-64">
      <input
        class="my-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        placeholder="Album Name..."
        type="text"
        v-model="name"
      />
      <button class="btn-blue mb-4" @click="onCreateAlbum()">Create Album</button>
    </div>
    <div class="text-red-500">{{ error }}</div>
    <hr />
    <h5 class="mt-4 text-2xl">List Of Albums</h5>
    <div class="flex flex-wrap w-full m-auto justify-center">
      <div
        v-for="(album, idx) in albums"
        :key="idx"
        class="cursor-pointer mt-4 ml-4 w-3/12 h-24 shadow-xl flex items-center justify-center"
        @click="openAlbumDetail(album)"
      >
        <div class="text-2xl">{{ album.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    async mounted() {
        await this.getAlbums();
    },

    data: () => ({
        name: '',
        error: '',
    }),
    computed: {
        ...mapState('albums', ['albums']),
        ...mapState('auth', ['user']),
    },
    methods: {
        ...mapActions({
            getAlbums: 'albums/getAlbums',
            createAlbum: 'albums/createAlbum',
        }),
        async onCreateAlbum() {
            if (!this.name) {
                this.error = 'Please enter a name';
                return;
            }
           try {
               console.log(this.user);
               await this.createAlbum({
                   name: this.name,
                   owner: this.user.username,
                   ownerId: this.user.id,
               });
               this.name = '';
           } catch (error) {
            //    console.error(error);
           }
        },
        openAlbumDetail(album) {
            this.$router.push(`albums/${album.id}`);
        },
    },
}
</script>