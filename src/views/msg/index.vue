<template>
	<el-row type="flex" align="middle" justify="center" class="w-full h-full box-border border-rounded-33px">
		<div class="lg:w-1200px flex w-full h-96% mx-20px my-10px box-border border-rounded-12px chat-container">
			<!-- 会话区域 -->
			<ChatDomain />
			<!-- 聊天区域 -->
			<ChatContent class="lg:block hidden" />
		</div>
	</el-row>
</template>

<script setup lang="ts">
import { getSessionsApi } from "@/api/modules/msg";
import { GlobalStore } from "@/store";
import { onMounted } from "vue";
import { MsgStore } from ".";
import { Message } from "@/api/interface/index";
import ChatContent from "./components/ChatContent.vue";
import ChatDomain from "./components/ChatDomain.vue";
import { ElMessage } from "element-plus";
import router from "@/routers";

const store = MsgStore();
const globalStore = GlobalStore();

onMounted(() => {
	init();
});

async function init() {
	if (globalStore.token) {
		// initSocket();
		if (!store.sessionList.length) {
			console.log("获取会话列表");
			getSessionList(store.sessionListOffset);
		}
	} else {
		ElMessage.error("登录失效！");
		router.push({ name: "home" });
	}
}

// 获取会话列表
async function getSessionList(start: number) {
	let params: Message.ReqGetSessionParams = {
		uid: globalStore.uid,
		pageNum: start,
		pageSize: 10
	};
	const res = await getSessionsApi(params);
	console.log("获取会话列表", res);
	if (res.code == "200") {
		store.sessionList = res.data!.datalist;
	} else {
		ElMessage.error("获取会话列表失败！");
	}

	// userList().then((res: any) => {
	//   if (res?.code == 200) {
	//     store.allSessionList = res?.data
	//   } else {
	//     proxy.$message.error(res?.message)
	//   }
	// })
}
// const screenHeight = computed((): string => (isDevice.value ? window.innerHeight + "px" : "calc(100vh - 80px)"));
</script>
<style scoped lang="scss">
.chat-container {
	box-shadow: 0 1px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
	:deep(.ep-card__body) {
		padding-left: 0 !important;
		@media (max-width: 1024px) {
			padding-right: 0 !important;
		}
	}
}
</style>
