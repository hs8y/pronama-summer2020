<template>
  <canvas id="canvas" :width="canvas_width" :height="canvas_height" ref="canvas"></canvas>
</template>

<script>
export default {
  props: {
    characterImage: {
      type: String,
      default: '',
    },
    backgroundImage: {
      type: String,
      default: '',
    },
    comment: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      is_loaded: false,
      canvas_width: 640,

      balloon_image: '/images/balloon.png',
    };
  },
  computed: {
    canvas_height() {
      // 16 : 9
      return this.canvas_width * (9 / 16);
    },
  },
  watch: {
    characterImage() {
      this.draw();
    },
    backgroundImage() {
      this.draw();
    },
    comment() {
      this.draw();
    },
  },
  methods: {
    draw() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // reset

      const character_image = this.characterImage;
      const background_image = this.backgroundImage;
      const comment = this.comment;

      this.drawBackground(ctx, background_image, () => {
        this.drawCharacter(ctx, character_image, () => {
          this.drawBalloon(ctx, this.balloon_image, () => {
            this.drawComment(ctx, comment, () => {
              let download_link = '';
              if (background_image && comment.length > 0) {
                download_link = this.$refs.canvas.toDataURL('image/png');
              }
              this.$emit('updateDownloadLink', download_link);
            });
          });
        });
      });
    },
    drawCharacter(ctx, src, callback = (function () {})) {
      if (!src) {
        callback();
        return;
      }

      let img = new Image();
      img.onload = () => {
        const dw = ctx.canvas.width * 0.15;
        const dh = dw;
        const dx = 15;
        const dy = (ctx.canvas.height - dh - 15);

        ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, dw, dh);

        callback();
      }
      img.src = src;
    },
    drawBalloon(ctx, src, callback = (function () {})) {
      if (!src) {
        callback();
        return;
      }

      let img = new Image();
      img.onload = () => {
        const dw = ctx.canvas.width * 0.78;
        const dh = ctx.canvas.width * 0.15;
        const dx = (ctx.canvas.width * 0.15 + 30);
        const dy = (ctx.canvas.height - dh - 15);

        ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, dw, dh);

        callback();
      }
      img.src = src;
    },
    drawComment(ctx, comment, callback = (function () {})) {
      if (!comment.length) {
        callback();
        return;
      }

      const dw = ctx.canvas.width * 0.78;
      const dh = ctx.canvas.width * 0.15;
      const x = (ctx.canvas.width * 0.15 + 60);
      const y = (ctx.canvas.height - dh - 15 + 10);

      const font_size = 22;
      const line_height = 1.2;
      const font_family = 'Noto Sans JP, Meiryo, sans-serif';

      ctx.font = `${font_size}px ${font_family}`;
      ctx.fillStyle = "#333333";

      comment.split('\n').map((line, index) => {
        let line_y = font_size;
        if (index > 0) {
          line_y += font_size * line_height * index;
        }
        ctx.fillText(line, x, y + line_y);
      });

      callback();
    },
    drawBackground(ctx, src, callback = (function () {})) {
      if (!src) {
        callback();
        return;
      }

      let img = new Image();
      img.onload = () => {
        this.drawImageCentering(ctx, img);

        callback();
      }
      img.src = src;
    },

    drawImageCentering(ctx, img) {
      const w = ctx.canvas.width;
      const h = ctx.canvas.height;

      const iw = img.width;
      const ih = img.height;
      const r  = Math.min(w / iw, h / ih);

      let nw = iw * r;
      let nh = ih * r;
      let ar = 1;
      if (nw < w) {
        ar = w / nw;
      }
      if (Math.abs(ar - 1) < 1e-14 && nh < h) {
        ar = h / nh;
      }
      nw *= ar;
      nh *= ar;

      let cw = iw / (nw / w);
      let ch = ih / (nh / h);

      let cx = (iw - cw) * 0.5;
      let cy = (ih - ch) * 0.5;

      if (cx < 0) cx = 0;
      if (cy < 0) cy = 0;
      if (cw > iw) cw = iw;
      if (ch > ih) ch = ih;

      ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h);
    }
  },
  mounted() {
    this.ctx = this.$el.getContext('2d')
    this.draw()
  }
}
</script>

<style lang="css" scoped>
</style>
