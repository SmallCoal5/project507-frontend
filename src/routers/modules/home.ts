import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// 首页模块
const homeRouter: Array<RouteRecordRaw> = [
	{
		path: "/admin",
		component: Layout,
		redirect: "/admin/home",
		children: [
			{
				path: "/admin/home",
				name: "admin",
				component: () => import("@/views/home/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "首页",
					key: "admin"
				}
			}
		]
	}
];

export default homeRouter;
