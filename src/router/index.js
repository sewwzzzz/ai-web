import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(), //history模式
  routes: [
    {
      path: '/',
      name: 'main',
      component:()=>import(`../views/Main.vue`)
    },
    {
      path: '/search',
      name: 'select',
      component:()=>import(`../views/Select.vue`)
    },
    {
      path: '/Block/:blockId/:keyId/:sourceId',
      name: 'block',
      component:()=>import(`../views/Block.vue`)
    },
    {
      path: '/Poster/:id',
      name: 'poster',
      component:()=>import(`../views/Poster.vue`)
    },
    {
      path: '/user',
      name: 'user',
      component: () => import(`../views/User.vue`),
      children: [
        {
          path: '/user',
          redirect:'/user/footlist'
        },
        {
          path: '/user/footlist',
          name: 'footlist',
          meta: {
            messageCode:'footlist'
          },
          component:()=>import(`../views/users/Foot.vue`)
        },
        {
          path: '/user/favlist',
          name: 'favlist',
          meta: {
            messageCode:'favlist'
          },
          component:()=>import(`../views/users/Collect.vue`)
        },
        {
          path: '/user/focuslist',
          name: 'focuslist',
          meta: {
            messageCode:'focuslist'
          },
        }
      ]
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
  ],
  // scrollBehavior:(to, from, savedPosition) => {
  //   if (savedPosition && to.meta.keepAlive) {
  //     return savedPosition;
  //   }
  //   return { x: 0, y:0 };
  // }

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