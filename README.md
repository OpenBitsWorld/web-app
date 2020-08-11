# OpenBits Web Application

<div align="center">
   <img align="center" src="src/assets/logo-black.png" width="250px" alt="OpenBits logo" title="OpenBits Logo">
</div>

This is the source code of the Web Application of OpenBits. The web application is a Vue.JS application and it includes both the landing page (the web site) and the actual application that allows to publish and invest in OpenBits. The following sections explain how to setup your own development environment to contribute to OpenBits or to run a fork of it. 

## Project setup

Firstly, clone this project by running: 

```
git clone https://gitlab.com/cervoneluca/openbits-web.git
```

Then install the needed node packages by running: 

```
npm install
```

Now, if you want to test the application by using the registry and contracts that are currently in production, then just run:

```
npm run serve
```

By doing so, you will use the following environment: 

**OPENBITS-OWNER:**
- wallet address: XKVU3cnfIXOSQkAAiTse7C2_xnzBkVxeKQ3oXGqAt_4

**OPENBITS-CURRENT-REGISTRY:**
- state address: J9L-OZSn8ytSe1f-r_fUfnncvWeR7HBpppRP6oVW11A

**OPENBITS PST:** 
- state address:  cvszFSVl9B--w93kQ_o_vLG5-CU-9XVkqHrpIfxEDdQ
- contract address: WEsD1ARHOvjzD3rFf3xiW9u7Dc0x5OSsJ1A6V0CE-40

If you do not want to use the above environment, you have to set up your development one, as described in the next section.

## Setup a customized development environment

Firstly you have to publish your customized SmartWeave contract that handles the OpenBits' registry. 

To do so, go in a different folder from the OpenBits root and [https://github.com/ArweaveTeam/SmartWeave] (Clone SmartWeave) by doing the following:

```
git clone https://github.com/ArweaveTeam/SmartWeave
```

### Compiles and minifies for production

```
npm run build
```

### Credits

- Section Why image is a derived work of <a href='https://www.freepik.com/free-photos-vectors/business'>Business vector created by freepik - www.freepik.com</a>
- The Universe Image in the hero background is a courtesy of <a href='https://www.freepik.com/free-photos-vectors/background'>Background vector created by upklyak www.freepik.com</a>
