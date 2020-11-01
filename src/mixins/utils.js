import hljs from 'highlight.js';
import parse from 'parse-package-name';
import pako from 'pako';
import untar from 'js-untar';
import showdown from 'showdown';
import cheerio from 'cheerio';
import { mapGetters } from 'vuex';
import config from '@/mixins/configs';

const utils = {
  mixins: [
    config,
  ],
  methods: {
    isHomePage() {
      return this.$route.path === '/';
    },
    groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    },
    isActivePage(page) {
      return this.$route.path === page;
    },
    getCurrentPage() {
      return this.$route.path;
    },
    getAllVersionsOfCurrentOpenBit() {
      if (this.$route.name === 'ExploreOpenBit') {
        const {
          name,
        } = parse(this.$route.params.id);
        const openBits = this.openBitsList().get(name);
        return openBits || [];
      }
      return [];
    },
    getCurrentOpenBit() {
      if (this.$route.name === 'ExploreOpenBit') {
        const {
          version,
        } = parse(this.$route.params.id);
        const allVersions = this.getAllVersionsOfCurrentOpenBit();
        if (version) {
          const filtered = allVersions.filter((o) => o.version === version);
          return filtered[0];
        }
        return allVersions.pop();
      }
      return [];
    },
    getCurrentOpenBitAddress() {
      if (this.$route.name === 'ExploreOpenBit') {
        const current = this.getCurrentOpenBit();
        return current.pstId;
      }
      return this.config.OPENBITS_CBVAC_STATUS;
    },
    openBitsList() {
      if (this.getOpenBits.length) {
        return this.groupBy(this.getOpenBits, (openbit) => openbit.name);
      }
      return new Map();
    },
    async retrieveCurrentOpenBitPackage() {
      const headers = new Headers();
      headers.append('Content-Type', 'application/octet-stream; charset=UTF-8');
      const packData = await fetch(
        `https://arweave.net/${this.getCurrentOpenBit().dataId}`,
        headers,
      );
      try {
        const packBuffer = await packData.arrayBuffer();
        const uintPackArray = new Uint8Array(packBuffer);
        const extracted = pako.inflate(uintPackArray);
        const extractedFiles = await untar(extracted.buffer);
        return extractedFiles;
      } catch (err) {
        return null;
      }
    },
    async retrieveCurrentOpenBitReadme() {
      try {
        const files = await this.retrieveCurrentOpenBitPackage();
        const readme = files.filter((file) => file.name === 'package/README.md');
        if (readme) {
          const converter = new showdown.Converter();
          converter.setOption('ghCodeBlocks', true);
          converter.setOption('emoji', true);
          const html = converter.makeHtml(readme[0].readAsString());

          // improve the generated HTML
          const $ = cheerio.load(html);
          $('code').each((i, e) => {
            const highligted = hljs.highlightAuto($(e).text());
            $(e).replaceWith(highligted.value);
          });
          return $.html();
        }
        return `
            <h1>${this.$route.params.id}</h1>
            <p>
              We searched around the whole multiverse
              and we were not able to find a readme for this OpenBit.
            </p>
            <p>
              However, for sure someone published it, so you can install it
              by running:
              <kbd class="d-block w-75 mt-3">
                openbits install ${this.$route.params.id}
              </kbd>
            </p>
          `;
      } catch (err) {
        return `
            <h1>${this.$route.params.id}</h1>
            <p>
              We searched around the whole multiverse
              and we were not able to find a readme for this OpenBit.
            </p>
            <p>
              However, for sure someone published it, so you can install it
              by running:
              <kbd class="d-block w-75 mt-3">
                openbits install ${this.$route.params.id}
              </kbd>
            </p>
          `;
      }
    },
    async retrieveCurrentOpenBitPackageJson() {
      try {
        const files = await this.retrieveCurrentOpenBitPackage();
        const packageJson = files.filter((file) => file.name === 'package/package.json');
        if (packageJson) {
          const {
            author,
            repository,
            homepage,
          } = packageJson[0].readAsJSON();
          return {
            author,
            repository,
            homepage,
          };
        }
        return {
          author: null,
          repository: null,
          webPage: null,
        };
      } catch (err) {
        return {
          author: null,
          repository: null,
          webPage: null,
        };
      }
    },
  },
  computed: {
    ...mapGetters({
      defaultARWallet: 'user/getDefaultARWallet',
      getOpenBits: 'openbits/getOpenBits',
    }),
    isLogged() {
      return this.defaultARWallet;
    },
  },
};

export default utils;
