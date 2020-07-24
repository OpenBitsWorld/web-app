<template>
  <b-badge
    :variant="badgeVariant"
    pill>
    <b-spinner
      small
      :variant="spinnerVariant"
      type="grow"
      label="Spinning"></b-spinner>
  </b-badge>
</template>

<script>
export default {
  name: 'SpinningBadge',
  props: ['badgeVariant', 'spinnerVariant'],
};
</script>
