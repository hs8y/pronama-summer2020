<template>
  <div class="editor">
    <dl class="editor__table">
      <div class="editor__table__row">
        <dt class="editor__table__head">
          画像
        </dt>
        <dd class="editor__table__cell">
          <div class="editor__profile">
            <div class="editor__profile__preview">
              <div class="editor__profile__preview__icon">
                <img :src="character_image" alt="">
              </div>
              <div class="editor__profile__preview__copyright" v-if="selected_character.copyright">
                {{ selected_character.copyright }}
              </div>
            </div>

            <div class="editor__profile__form">
              <b-form-group>
                <label for="character">キャラクター</label>
                <select class="form-control" id="character" v-model="selected_character" @change="onCharacterChange">
                  <option :value="char" v-for="char in characters">
                    {{ char.name }}
                  </option>
                </select>
              </b-form-group>
              <b-form-group>
                <div class="">
                  <div class="form-check form-check-inline" v-for="(image, index) in selected_character.images">
                    <input type="radio" class="form-check-input" :id="`customCheck_${index}`" name="character_type" :value="index" v-model="character_type_index">
                    <label class="form-check-label" :for="`customCheck_${index}`">{{ image.name }}</label>
                  </div>
                </div>
              </b-form-group>
            </div>
          </div>
        </dd>
      </div>
      <div class="editor__table__row">
        <dt class="editor__table__head">
          背景画像
        </dt>
        <dd class="editor__table__cell">
          <div class="editor__background">
            <div class="custom-file" v-if="!background">
              <input type="file" class="custom-file-input" id="backgroundImage" accept="image/*" @change="onBackgroundChange" required>
              <label class="custom-file-label" for="backgroundImage">画像を選択してください</label>
              <div class="form-text small text-muted">
                <i class="fas fa-info-circle"></i> 選択したファイルはオンラインにアップロードされないのでご安心ください！
              </div>
            </div>
            <div v-else>
              <div class="editor__background__image">
                <img :src="background" alt="">
                <span class="editor__background__image__reset_btn" title="削除" @click="resetBackground()">&times;</span>
              </div>
            </div>
          </div>
        </dd>
      </div>
      <div class="editor__table__row">
        <dt class="editor__table__head">
          コメント
        </dt>
        <dd class="editor__table__cell">
          <textarea class="form-control" rows="3" @change="onCommentChange"></textarea>
          <div class="form-text small text-muted">
            <i class="fas fa-info-circle"></i> 文字が突き抜けないようにうまく調整してね！
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    app() { return this.$store.state.app; },
    characters() { return this.$store.state.characters; },
    character_image() { return this.$store.getters.characterImage; },

    selected_character: {
      get() { return this.app.character; },
      set(value) { this.$store.commit('updateCharacter', value); },
    },
    character_type_index: {
      get() { return this.app.character_type_index; },
      set(index) { this.$store.commit('updateCharacterType', index); },
    },
    background: {
      get() { return this.app.background; },
      set(value) { this.$store.commit('updateBackground', value); },
    },
    comment: {
      get() { return this.app.comment; },
      set(value) { this.$store.commit('updateComment', value); },
    },
  },

  methods: {
    onCommentChange(e) {
      this.$store.commit('updateComment', e.target.value);
    },

    onCharacterChange(e) {
      this.$store.commit('updateCharacter', this.selected_character);
      this.$store.commit('updateCharacterType', 0);
    },
    onCharacterTypeChange(e) {
      this.$store.commit('updateCharacterType', this.character_type_index);
    },

    onBackgroundChange(e) {
      const files = (e.target.files || e.dataTransfer.files);
      if (!files) {
        return false;
      }

      this.setBackgroundImage(files[0]);
    },
    resetBackground() {
      this.$store.commit('updateBackground', '');
    },
    setBackgroundImage(file) {
      if (!file.type.startsWith('image/')){
        return false;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.$store.commit('updateBackground', e.target.result);
      };
      reader.readAsDataURL(file);
    },
  },
}
</script>
