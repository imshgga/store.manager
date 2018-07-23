/**
 * @Author: houshengwei
 * @Date:   2018/07/23
 * @Last modified by:   houshengwei
 * @Last modified time: 2018/07/23
 */

import pageA from '../pages/pageA/store'
import subPageA1 from '../pages/pageA/subPageA1/store'
import subPageA2 from '../pages/pageA/subPageA2/store'
import pageB from '../pages/pageB/store'

export default [
  {
    rule: /pageA/,
    name: 'pageA',
    module: pageA
  },
  {
    rule: /pageA\/a1/,
    name: 'subPageA1',
    module: subPageA1
  },
  {
    rule: /pageA\/a2/,
    name: 'subPageA2',
    module: subPageA2
  },
  {
    rule: /pageB/,
    name: 'pageB',
    module: pageB
  },


]
