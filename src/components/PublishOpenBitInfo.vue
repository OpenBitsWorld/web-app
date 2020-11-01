<template>
  <div>
    <h3>Publish your OpenBit</h3>
    <p class="lead">
      <b-alert
        show
        dismissible
        variant="secondary-color">
        <h4>Pay Attention!</h4>
        <p>
          Here you can create your OpenBits. Currently, OpenBits only handles node.js packages.
          Note that you can publis OpenBits also by means of the openbits cli by executing the
          following command in the root folder of your node.js package:
          <pre class="mt-3"><kbd>openbits publish</kbd></pre>
          After having created your OpenBit it will be available to other users. They will be
          able to use it by installing the OpenBits cli and writing the following in their shell:
          <pre class="mt-3"><kbd>openbits install your-package-name[@your.package.version]</kbd>
          </pre>
        </p>
        <p>
          The creation of an OpenBit costs an amount of AR equals to the fee needed to upload the
          files on the arweave network (usually a few $cents for MB), plus the fee for OpenBits,
          that is currently {{getFeeForPublication}} AR. Fees
          will be redistributed to OpenBits shares owners and to OpenBits users as described
          <a href="https://gitlab.com/cervoneluca/openbits" target="_blank">here</a>.
        </p>
      </b-alert>
    </p>
  </div>
</template>

<script>
import config from '@/mixins/configs';

export default {
  name: 'PublishOpenBitInfo',
  mixins: [config],
  computed: {
    getFeeForPublication() {
      return this.config.FEE_FOR_PUBLICATION;
    },
  },
};
</script>
