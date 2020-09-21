<template>
  <section class="trianle-and-logo-separator">
    <div class="triangle">
      <img
        src="../../assets/logo-black.png"
        class="why-image d-block mx-auto divider-logo"/>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TriangleAndLogoSeparator',
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/custom-theme.scss';

.trianle-and-logo-separator {
  position:relative;
  height:250px;
  overflow: hidden;
  .triangle {
    display:block;
    width:100%;
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
    &:after, &:before{
      content: '';
      position:absolute;
      top: 0;
      width: 50%;
      z-index: 100;
      border-bottom: 160px solid $main-color;
      -moz-transform: rotate(0.000001deg);
      -webkit-transform: rotate(0.000001deg);
      -o-transform: rotate(0.000001deg);
      -ms-transform: rotate(0.000001deg);
      transform: rotate(0.000001deg);
    }
    .divider-logo {
      display:block;
      width: 10rem;
      margin-top:90px;
      padding-left:20px;
      z-index:105;
    }

  }
}
</style>
