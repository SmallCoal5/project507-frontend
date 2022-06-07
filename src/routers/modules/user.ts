import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 超级表格模块
const proTableRouter: Array<RouteRecordRaw> = [
	{
		path: "/user",
		component: Layout,
		redirect: "/user/list",
		meta: {
			title: "用户管理"
		},
		children: [
			{
				path: "/user/deleteList",
				name: "deleteList",
				component: () => import("@/views/proTable/useHooks/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "用户回收站",
					key: "deleteList"
				}
			},
			{
				path: "/user/list",
				name: "userList",
				component: () => import("@/views/user/list/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "用户列表",
					key: "userList"
				}
			}
		]
	}
];

export default proTableRouter;
