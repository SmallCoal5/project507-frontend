<template>
	<!-- 聊天区域 -->
	<div class="h-100% content-box flex box-border">
		<!-- 聊天头部 -->
		<ChatHead></ChatHead>
		<!-- 聊天内容 -->
		<el-scrollbar class="rounded-6px box-border w-full message-box transition-all" max-height="100%" ref="chatScrollbar">
			<div class="p-20px">
				<template v-for="(item, index) in messages" :key="index">
					<!-- 聊天时间 -->
					<div class="text-12px flex w-full justify-center">
						<div
							class="bg-gray-200 w-auto text-12px py-5px px-8px text-center rounded-5px"
							v-if="(item && index === 0) || (item && item.created_on - messages[index - 1].created_on > 5 * 60 * 1000)"
						>
							{{ formatTime(item.created_on) }}
						</div>
					</div>
					<el-row type="flex" class="mb-20px" :class="item.from_uid == globalStore.uid && 'flex-row-reverse'">
						<el-avatar :size="42" :src="item.from_uid == globalStore.uid ? globalStore.avatar : store.sessionAvatar" />
						<div
							v-if="item.image_url.length == 0"
							:class="item.from_uid == globalStore.uid ? 'mr-10px bg-green-100' : 'ml-10px bg-white'"
							class="break-words px-15px rounded-6px text-left py-12px msg"
						>
							{{ item.content }}
						</div>
						<div v-else :class="item.from_uid == globalStore.uid ? 'mr-10px' : 'ml-10px'">
							<el-image
								v-if="item.image_url.length != 0"
								class="w-200px ha max-h-200px"
								:src="'/base/' + item.image_url"
								:preview-src-list="[item.image_url]"
								:initial-index="4"
								fit="cover"
							/>
							<video v-if="item.image_url.length == 0" width="300" height="180" controls>
								<source :src="item.content" type="video/mp4" />
								您的浏览器不支持 HTML5 video 标签。
							</video>
						</div>
						<el-icon
							v-if="item.status === 0"
							:class="item.from_uid == globalStore.uid ? 'mr-10px' : 'ml-10px'"
							class="is-loading pt-5px"
							size="40px"
						>
							<i i="ep-loading" class="c-gray-300"></i>
						</el-icon>
					</el-row>
				</template>
			</div>
		</el-scrollbar>
		<!-- 聊天底部 -->
		<ChatFoot></ChatFoot>
	</div>
</template>

<script setup lang="ts">
import ChatHead from "./ChatHead.vue";
import ChatFoot from "./ChatFoot.vue";
import { GlobalStore } from "@/store";
import { computed, nextTick, onMounted, onUpdated, ref } from "vue";
// import { computed } from "vue";
import { MsgStore } from "..";
import { formatTime } from "../utils";
import { Message } from "@/api/interface";
// import { Messages } from "../interface";

const store = MsgStore();
const globalStore = GlobalStore();
const chatScrollbar = ref(null);

onMounted(() => {
	nextTick(() => {
		store.chatScrollbar = chatScrollbar.value;
	});
	// console.log("加载聊天页面");
	// store.toBottom();
});

onUpdated(() => {
	store.toBottom();
});
// 获取会话列表
const messages = computed(() => {
	let item = store.sessionList.filter((x: Message.SessionInfo) => x.id == store.sessionSelectId);
	// console.log("获取会话列表", item);
	if (item.length == 0) return [];
	return item[0].messages;
	if (!store.messageList.has(store.sessionSelectId)) return [];
	// store.toBottom();
	return store.messageList.get(store.sessionSelectId)!;
});
// const messageList = store.messageList.get(store.sessionSelectId);

// 渲染时间每隔5分钟显示一次
// const renderMessageDate = computed(() => {
// 	return (message: any, index: number, messages: Array<any>) => {
// 		console.log("消息时间", message.created_on);
// 		if ((message && index === 0) || (message && message.created_on - messages[index - 1].created_on > 5 * 60 * 1000)) {
// 			return `- - ${formatTime(message.created_on)} - -`;
// 		}
// 		return "";
// 	};
// });
</script>

<style scoped lang="scss">
.content-box {
	position: relative;
	display: flex;
	height: 100%;
	overflow: hidden;
	flex: 1;
	flex-flow: column;
}
.message-box {
	overflow-y: auto;
	background: #f8f9fa;
	flex: 1;
}
.emo-image {
	display: inline-block;
	width: 30px;
	height: 30px;
	vertical-align: middle;
}
.msg {
	max-width: calc(70%);
}
</style>
