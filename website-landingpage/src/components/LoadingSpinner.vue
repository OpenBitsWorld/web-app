<template>
  <b-spinner
    :variant="color"
    type="grow"
    label="Loading ..."></b-spinner>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: ['variant'],
  computed: {
    color() {
      return this.variant ? this.variant : 'main-color';
    },
  },
};
</script>
