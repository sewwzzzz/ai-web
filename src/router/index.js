import { createRouter, createWebHistory } from "vue-router"
import useInfoStore from "@/store/info"
import { commitMessage } from "@/datas/config"

const router = createRouter({
  history: createWebHistory(), //history模式
  routes: [
    {
      path: '/',
      name: 'main',
      component:()=>import(`../views/Main.vue`)
    },
    {
      path: '/Block/:blockId/:keyId/:sourceId',
      name: 'block',
      component:()=>import(`../views/Block.vue`)
    },
    {
      path: '/message',
      name: 'message',
      component: ()=>import(`../views/Message.vue`),
      children: [
        {
          path: '/message',
          redirect:'/message/reply'
        },
        {
          path: '/message/reply',
          name: 'reply',
          meta: {
            messageCode:'reply'
          },
          component: ()=>import(`../views/messages/Reply.vue`)
        },
        {
          path: '/message/at',
          name: 'at',
          meta: {
            messageCode:'at',
          },
          component:()=>import(`../views/messages/At.vue`)
        },
        {
          path: '/message/love',
          name: 'love',
          meta: {
            messageCode:'love'
          },
          component:()=>import(`../views/messages/Love.vue`)
        },
        {
          path: '/message/system',
          name: 'system',
          meta: {
            messageCode:'system'
          },
          component:()=>import(`../views/messages/System.vue`)
        }
      ]
    },
    {
      path: '/history',
      name: 'history',
      component:()=>import(`../views/History.vue`)
    }
  ]

})

// router.beforeEach((to, from, next) => {
//   const infoStore = useInfoStore()
//   if (to.path === '/') {
//     next()
//   }
//   else {
//     if (infoStore.token != '') {
//       next()
//     } else {
//       commitMessage('error','登陆超时')
//       setTimeout(()=>next('/'),1000)
//     }
//   }
// })

export default router