<template>
  <div class="preview">
    <div class="preview__canvas_frame">
      <AppCanvas class="preview__canvas"
        :character-image="character_image"
        :background-image="background"
        :comment="comment"
        @updateDownloadLink="updateDownloadLink"
        :download-type="download_type"
        ref="canvas"
      />
    </div>
    <div class="text-right my-1" v-if="download_link !== ''">
      <a class="btn btn-primary" :href="download_link" :download="download_name" target="_blank">
        <i class="fas fa-file-download"></i> 画像をダウンロード
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      download_link: '',
      download_type: 'image/png',
    };
  },
  computed: {
    app() { return this.$store.state.app; },
    characters() { return this.$store.state.characters; },
    character_image() { return this.$store.getters.characterImage; },

    selected_character() { return this.app.character; },
    character_type_index() { return this.app.character_type_index; },
    background() { return this.app.background; },
    comment() { return this.app.comment; },

    download_name() {
      const ext = (this.download_type === 'image/png' ? 'png' : 'jpg');
      const name = `image_${this.now()}`;

      return `${name}.${ext}`;
    },
  },

  methods: {
    drawCanvas() {
      this.$refs.canvas.draw();
    },
    updateDownloadLink(download_link) {
      this.download_link = download_link;
    },
    now() {
      const d = new Date();
      return [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDay(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
      ].map(v => this.zeroPadding(v)).join('');
    },
    zeroPadding(num, len = 2) {
      if (String(num).length >= len) return String(num);

      return (String(0).repeat(len) + String(num)).slice(-1 * len);
    },
  }
}
</script>
