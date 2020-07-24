<template>
  <b-container class="home-page">
    <b-jumbotron
      class="mt-5"
      bg-variant="dark"
      text-variant="white"
      border-variant="dark">
      <template
        v-slot:header>
        <h1 class="text-center">
          Welcome To OpenBits!
        </h1>
      </template>

      <template v-slot:lead>
        <h1>
          <inline-svg
            class="d-block mx-auto logo"
            :src="require('../assets/openbits-logo.svg')"/>
        </h1>
        <p class="mt-4">
          OpenBits is a platform based on the Arweave blockchain.
          Arweave is a network that incentivize users to create
          censorship-resistant permanent contents.
          OpenBits incentivize developers to create those small packages
          that lay the foundation to all the complex applications we use day by day.
        </p>
        <h3>Why OpenBits?</h3>
        <p>
          Open Source (hereinafter OS) developers create software on a daily base.
          While their main target is usually to create full-fledged applications
          that can handle complex tasks in specific scenarios, several OS
          developers often create (and use) small software (i.e. packages) aimed
          to simplify their life (or the life of other developers)
          when facing common and very specific development tasks.

        </p>
        <blockquote class="blockquote text-center">
          <footer
            class="blockquote-footer text-white">
            As a result, these small software are the essential bricks that
            are used to build all kind of applications that we use day by day.
            Thus, I like to think about them as the Bits of all software and,
            because their source code is almost always open, they are Open Bits!
          </footer>
        </blockquote>
      </template>
    </b-jumbotron>
  </b-container>
</template>

<script>
import InlineSvg from 'vue-inline-svg';

export default {
  name: 'Welcome',
  components: {
    InlineSvg,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home-page{
    .logo{
      margin-left:auto;
      margin-right:auto;
      height:200px;
      width:auto;
    }
  }
</style>
