<template>
  <div>
    <b-button
      variant="multiverse-color"
      v-b-modal="`login-modal-${modalId}`">
        <b>Login</b>
    </b-button>
    <b-modal
      :id="`login-modal-${modalId}`"
      :ref="`login-modal-${modalId}`"
      title="Login with your arweave JSON wallet"
      hide-footer>
      <vue-dropzone
        ref="myVueDropzone"
        id="dropzone"
        :useCustomSlot="true"
        :options="dropzoneOptions">
        <div class="dropzone-custom-content">
          <h1>
            <b-icon icon="upload"></b-icon>
          </h1>
          <h3 class="dropzone-custom-title">
            Drop your arweave JSON wallet here!
          </h3>
          <div class="subtitle">
            Or click to select an arweave
            JSON wallet from from your computer.
          </div>
        </div>
      </vue-dropzone>
    </b-modal>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import { mapActions } from 'vuex';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  name: 'LayoutLoginModal',
  props: ['modalId'],
  components: {
    vueDropzone: vue2Dropzone,
  },
  methods: {
    ...mapActions({
      setARDefaultWallet: 'user/setARDefaultWallet',
    }),
  },
  data() {
    return {
      dropzoneOptions: {
        url: 'http://localhost:8080/',
        accept: (file, done) => {
          const reader = new FileReader();
          reader.onload = async (event) => {
            this.$refs[`login-modal-${this.modalId}`].hide();
            const jwk = JSON.parse(event.target.result);
            await this.$arImportWallet({
              isDefault: true,
              jwk,
            });

            const defWallet = this.$arGetDefaultWallet;
            this.setARDefaultWallet(defWallet);
            // this.$router.push('/explore-openbits');
          };
          reader.readAsText(file);
          done();
        },
        maxFiles: 1,
        thumbnailWidth: 200,
        addRemoveLinks: true,
      },
    };
  },
};
</script>
