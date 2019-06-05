import Vue from 'vue'
import Router from 'vue-router'
import footerpage from '@/components/footerpage'
import imgpage from '@/components/imgpage'
import jsavpage from '@/components/jsavpage'
import JSONPage from '@/components/JSONPage'
import MapPage from '@/components/MapPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/footer',
      component: footerpage
    },
    {
      path: '/imgpage',
      component: imgpage
    },
    {
      path: '/jsavpage',
      component: jsavpage
    },
    {
      path: '/jsonpage',
      component: JSONPage
    },
    {
      path: '/mappage',
      component: MapPage
    }
  ]
})