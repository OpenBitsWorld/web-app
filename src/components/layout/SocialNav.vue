<template>
  <div class="social-nav pt-2 px-2">
    <b-nav-item
      target="_blank"
      href="https://discord.gg/ZYjAwXk"
      class="d-inline-block social-icon">
      <font-awesome-icon
        size="lg"
        :icon="['fab', 'discord']" />
    </b-nav-item>
    <b-nav-item
      target="_blank"
      href="https://twitter.com/OpenBitsWorld"
      class="d-inline-block social-icon">
      <font-awesome-icon
        size="lg"
        :icon="['fab', 'twitter']" />
    </b-nav-item>
    <b-nav-item
      target="_blank"
      href="https://t.me/openbits_official"
      class="d-inline-block social-icon">
      <font-awesome-icon
        size="lg"
        :icon="['fab', 'telegram']" />
    </b-nav-item>
    <b-nav-item
      target="_blank"
      href="https://gitlab.com/cervoneluca/openbits"
      class="d-inline-block social-icon">
      <font-awesome-icon
        size="lg"
        :icon="['fab', 'gitlab']" />
    </b-nav-item>
    <b-nav-item
      target="_blank"
      href="https://community.xyz/#6eTVr8IKPNYbMHVcpHFXr-XNaL5hT6zRJXimcP-owmo"
      class="d-inline-block social-icon">
      <img src="../../assets/communityxyz-icon-white.svg" class="communityxyz-logo-icon" />
    </b-nav-item>
  </div>
</template>

<script>
export default {
  name: 'LayoutSocialNav',
};
</script>

<style lang="scss" scoped>
  .communityxyz-logo-icon {
    height: 21px;
    padding-bottom:5px;
  }
</style>
