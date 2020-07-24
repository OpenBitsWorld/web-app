<template>
  <div class="p-5">
  <!-- <b-container
    id="user-profile-page"
    class="h-100"> -->
    <b-jumbotron
      bg-variant="info"
      text-variant="white">
      <template v-slot:header>Here you can set your profile information</template>
      <template v-slot:lead>
       You can set a name, a surname and an email to associate to this Arweave address.
        For each one of these information you can choose if you want it to be public or private.
        If you choose "private", you'll be the only one to be able to read them.
      </template>
      <hr class="my-4">
      <b-button variant="primary" href="#">Do Something</b-button>
      <b-button variant="success" href="#">Do Something Else</b-button>
    </b-jumbotron>
  <!-- </b-container> -->
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
};
</script>

<style lang="scss" scoped>
  #user-profile-page{
    border: 2px solid black;
    text-align:center;
  }
</style>
