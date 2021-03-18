export default [
        {
        path: '/admin',
        component: '../../layout/AdminLayout',
        routes: [
          { path: '/admin/dashboard/user', component: './AdminDashboard/User/',name:"用户管理" ,isShow: true },
          { path: '/admin/dashboard/cuisine', component: './AdminDashboard/Cuisine/' ,name:'菜品管理',isShow: true},
          { path: '/admin/dashboard/order', component: './AdminDashboard/Order/',name:"订单管理" ,isShow: true},
          { path: '/admin/dashboard/notice', component: './AdminDashboard/Notice/',name:"销售公告管理" ,isShow: true},
          { path: '/admin/dashboard/data', component: './AdminDashboard/Data/',name:"销售数据运用" ,isShow: true},
          { path: '/admin/dashboard/close', component: './AdminDashboard/Close/',name:"结算" ,isShow: true},

        ]
      },
      {
        path:'/',
        routes: [
          {
            path: '/',
            redirect: '/login',
          },
          {
            path: '/login',
            component: 'Login/Login'
          }]
      }
    ]