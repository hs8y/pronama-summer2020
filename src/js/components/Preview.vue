<template>
  <div class="preview">
    <div class="preview__canvas_frame">
      <AppCanvas class="preview__canvas"
        :character-image="character_image"
        :background-image="background"
        :comment="comment"
        @updateDownloadLink="updateDownloadLink"
      />
    </div>
    <div class="text-right my-1" v-if="download_link !== ''">
      <a class="btn btn-primary" :href="download_link" :download="download_name">
        <i class="fas fa-file-download"></i> 画像をダウンロード
      </a>
    </div>
  </div>
</template>

<script>
const path = require('path');

export default {
  data() {
    return {
      download_link: '',
    };
  },
  computed: {
    app() { return this.$store.state.app; },
    characters() { return this.$store.state.characters; },

    selected_character() { return this.app.character; },
    character_type_index() { return this.app.character_type_index; },
    background() { return this.app.background; },
    comment() { return this.app.comment; },

    character_image() {
      const image_file_name = this.selected_character.images[this.character_type_index].file;

      return path.join(this.app.image_path, image_file_name);
    },

    download_name() {
      return 'download.png';
    },
  },

  methods: {
    updateDownloadLink(download_link) {
      this.download_link = download_link;
    },
  }
}
</script>
