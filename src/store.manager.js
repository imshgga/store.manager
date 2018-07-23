/**
 * @Author: houshengwei
 * @Date:   2018/07/22
 * @Last modified by:   houshengwei
 * @Last modified time: 2018/07/23
 */

class StoreManager {
  constructor (args) {
    this.args = args
    this.instance = ''
    this.executing = false
  }

  _getType (any) {
    return Object.prototype.toString.call(any).slice(8, -1)
  }

  start (...args) {
    if (!this.instance) {
      this.instance = new StoreManager(args)

      let url = window.location.href
      let [rules = [], $store, ...rest] = args

      window.addEventListener('hashchange', () => {
        this.instance && this.instance.updateStore()
      })
      window.addEventListener('popstate', () => {
        this.instance && this.instance.updateStore()
      })

      $store.registerModule('_storeManage_', {
        namespaced: true,
        state: {
          version: '0.0.1',
          'MOUNTED': ''
        },
        mutations: {
          'MOUNTED' (state, payload) {
            state['MOUNTED'] = payload
          }
        }
      })
    }

    return this.instance
  }

  updateStore (url) {
    if (this.executing) return

    try {
      url = url || window.location.href
      if (!url) throw ''
    } catch (e) {
      throw new Error('非浏览器环境时,需要提供参数: 匹配对象<String>, 如url等')
    }
    this.executing = true

    let [rules, $store, ...rest] = this.args
    let matched = []
    let notMatched = []
    let mounted = []

    rules.forEach(item => {
      let isMatched
      if (this._getType(item.rule) === 'RegExp') {
        isMatched = item.rule.test(url)
      } else if (this._getType(item.rule) === 'Function') {
        isMatched = item.rule(url, ...this.args)
      } else {
        throw new Error('Expected the `rule` to be a function or regExp.')
      }
      if (isMatched) {
        matched.push(item)
      } else {
        notMatched.push(item)
      }
    })

    matched.forEach(item => {
      let {name, module} = item
      if (!name || !module) {
        throw new Error('Missing `name` or `module` for rules')
      }

      // if (module.namespaced !== false) {
      //   module.namespaced = true
      // }

      if ($store.state[name] === undefined) {
        $store.registerModule(name, module)
      }

      mounted.push(name)
    })

    setTimeout(() => {
      notMatched.forEach(item => {
        let moduleName = item.name
        $store.state[moduleName] && $store.unregisterModule(moduleName)
      })

      $store.commit('_storeManage_/MOUNTED', `_${mounted.join('_')}_`)
      this.executing = false
    }, 100)
  }
}

let storeManager = new StoreManager()
export default storeManager
