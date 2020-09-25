<template>
  <section class="trianle-and-logo-separator">
    <div :class="classes" :style="cssProps">
      <img
        v-if="logo"
        src="../../assets/logo-black.png"
        class="why-image d-block mx-auto divider-logo"/>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TriangleAndLogoSeparator',
  props: ['color', 'triangle', 'logo'],
  mounted() {
    console.log(this.color);
  },
  computed: {
    cssProps() {
      return {
        '--borderColor': this.color,
      };
    },
    classes() {
      if (this.triangle === 'down') {
        return 'triangle down';
      }
      return 'triangle up';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/custom-theme.scss';

.trianle-and-logo-separator {
  position:relative;
  height:256px;
  overflow: hidden;
  .triangle {
    display:block;
    width:100%;
    border-color: var(--borderColor);
    z-index:100;
    &:before {
      right: 50%;
      border-right: 1000px solid transparent;
      border-left: 1000px solid;
    }
    &:after{
      left: 50%;
      border-left: 1000px solid transparent;
      border-right: 1000px solid;
    }
    &.down {
      &:after, &:before{
        content: '';
        position:absolute;
        top: 0;
        width: 50%;
        z-index:-100;
        border-bottom-width: 160px;
        border-bottom-style: solid;
        border-bottom-color: inherit;
        -moz-transform: rotate(0.000001deg);
        -webkit-transform: rotate(0.000001deg);
        -o-transform: rotate(0.000001deg);
        -ms-transform: rotate(0.000001deg);
        transform: rotate(0.000001deg);
      }
      .divider-logo {
        display:block;
        width: 12rem;
        margin-top:96px;
        padding-left:40px;
        z-index:105!important;
        -moz-transform: rotate(-9deg);
        -webkit-transform: rotate(-9deg);
        -o-transform: rotate(-9deg);
        -ms-transform: rotate(-9deg);
        transform: rotate(-9deg);
      }
    }
    &.up {
      &:after, &:before{
        content: '';
        position:absolute;
        top: 0;
        width: 50%;
        z-index:-100;
        border-top-width: 160px;
        border-top-style: solid;
        border-top-color: inherit;
        -moz-transform: rotate(0.000001deg);
        -webkit-transform: rotate(0.000001deg);
        -o-transform: rotate(0.000001deg);
        -ms-transform: rotate(0.000001deg);
        transform: rotate(0.000001deg);
      }
      .divider-logo {
        display:block;
        width: 12rem;
        padding-left:40px;
        z-index:105!important;
        -moz-transform: rotate(-9deg);
        -webkit-transform: rotate(-9deg);
        -o-transform: rotate(-9deg);
        -ms-transform: rotate(-9deg);
        transform: rotate(-9deg);
      }
    }
  }
}
</style>
