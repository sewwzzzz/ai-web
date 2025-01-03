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
      path: '/message',
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
    }
  ]

})

export default router