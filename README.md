# Store.manager

[![npm](https://img.shields.io/npm/v/store.manager.svg)](https://www.npmjs.com/package/store.manager) [![size](http://img.badgesize.io/https://cdn.jsdelivr.net/npm/store.manager/dist/store.manager.umd.js?compression=gzip)](http://img.badgesize.io/https://cdn.jsdelivr.net/npm/store.manager/dist/store.manager.umd.js) [![install size](https://packagephobia.now.sh/badge?p=store.manager)](https://packagephobia.now.sh/result?p=store.manager)

It helps you mount the `module` of vuex when the `rules` matched `window.location.href` or return `true`, and unmount when not matched or return 'false'.

### Usage

```Bash
  npm install store.manager --save
```

```JavaScript
  import storeManager from 'store.manager'
  import store from './store' // The instance of vuex store

  const rules = [
    {
      rule: /pageA/, // a Regexp or Function
      // rule: function (...args) {
      //    console.log(args)
      //    return /pageA/.test(args.url)
      // },
      name: 'pageA', // name for module
      module: menuEdit // a official `module` of vuex
    }
  ]

  const manager = storeManager.start(rules, store /* other args */) // that's all!
```
* Notice
When you are using 'vue-router' and the version above '2.8.0',the `hashchange` or `popState` event will not be listened. ([issue: 1807](https://github.com/vuejs/vue-router/issues/1807#issuecomment-336494269))You should invoking `managerInstance.updateStore` in the `beforeEach` hook:

```JavaScript
router.beforeEach((to, from, next) => {
  let url = to.fullPath

  manager.updateStore(url)
     next()
  })
```

### License

MIT
