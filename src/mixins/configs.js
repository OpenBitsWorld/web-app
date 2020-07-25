import configs from '@/configs/configs';

const config = {
  computed: {
    config() {
      return configs();
    },
  },
};

export default config;
