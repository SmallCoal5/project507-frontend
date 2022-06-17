import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 超级表格模块
const adminRouter: Array<RouteRecordRaw> = [
	{
		path: "/admin/user",
		component: Layout,
		redirect: "/admin/user/list",
		meta: {
			title: "用户管理"
		},
		children: [
			{
				path: "/admin/user/list",
				name: "userList",
				component: () => import("@/views/admin/user.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "用户列表",
					key: "userList"
				}
			}
		]
	},
	{
		path: "/admin/article",
		component: Layout,
		redirect: "/admin/article/list",
		meta: {
			title: "文章管理"
		},
		children: [
			{
				path: "/admin/article/list",
				name: "articleList",
				component: () => import("@/views/admin/article.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "文章列表",
					key: "articleList"
				}
			},
			{
				path: "/admin/article/deletelist",
				name: "articleDeleted",
				component: () => import("@/views/admin/article.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "文章回收站",
					key: "articleDeleted"
				}
			}
		]
	}
];

export default adminRouter;
