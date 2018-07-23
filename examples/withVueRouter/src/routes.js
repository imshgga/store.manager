/**
 * @Author: houshengwei
 * @Date:   2018/07/23
 * @Last modified by:   houshengwei
 * @Last modified time: 2018/07/23
 */

import pageA from './pages/pageA'
import pageB from './pages/pageB'
import subPageA1 from './pages/pageA/subPageA1'
import subPageA2 from './pages/pageA/subPageA2'

export default [
  {
    path: '/',
    name: 'root',
    redirect: {
      name: 'subPageA1'
    }
  },
  {
    path: '/pageA',
    name: 'pageA',
    component: pageA,
    children: [
      {
        path: 'a1',
        name: 'subPageA1',
        component: subPageA1
      },
      {
        path: 'a2',
        name: 'subPageA2',
        component: subPageA2
      },
    ]
  },
  {
    path: '/pageB',
    name: 'pageB',
    component: pageB
  },

]
