<template>
	<div class="lg:w-73% w-100%">
		<!-- 聊天区域 -->
		<div v-show="true">
			<!-- 聊天头部 -->
			<ChatHead></ChatHead>

			<!-- 聊天内容 -->
			<div class="px-20px h-500px">
				<el-scrollbar
					class="rounded-6px box-border"
					max-height="100%"
					ref="chatScrollbar"
					style="background: var(--ep-color-primary-light-9)"
				>
					<div class="p-20px">
						<template v-for="(item, index) in messages" :key="index">
							<!-- 聊天时间 -->
							<div class="text-12px my-20px text-center" style="color: var(--ep-color-primary-light-3)">
								{{ renderMessageDate(item, index, messages) }}
							</div>
							<el-row type="flex" class="mb-20px" :class="item.from_uid == globalStore.uid && 'flex-row-reverse'">
								<el-avatar :size="42" :src="store.sessionAvatar" />
								<div
									v-if="item.image_url.length == 0"
									:class="item.from_uid == globalStore.uid ? 'mr-10px' : 'ml-10px'"
									style="color: var(--ep-color-primary)"
									class="text break-words px-15px rounded-6px text-left py-12px"
								>
									{{ item.content }}
								</div>
								<div v-else :class="item.from_uid == globalStore.uid ? 'mr-10px' : 'ml-10px'">
									<el-image
										v-if="item.image_url.length != 0"
										class="w-200px ha max-h-200px"
										:src="item.content"
										:preview-src-list="[item.content]"
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
									<i i="ep-loading" style="color: var(--ep-color-primary-light-3)"></i>
								</el-icon>
							</el-row>
						</template>
					</div>
				</el-scrollbar>
			</div>

			<!-- 聊天底部 -->
			<ChatFoot class="mt-20px"></ChatFoot>
		</div>
	</div>
</template>

<script setup lang="ts">
import ChatHead from "./ChatHead.vue";
import ChatFoot from "./ChatFoot.vue";
import { GlobalStore } from "@/store";
import { computed } from "vue";
// import { computed } from "vue";
import { MsgStore } from "..";
import { formatTime } from "../utils";
// import { Messages } from "../interface";

const store = MsgStore();
const globalStore = GlobalStore();
// 获取会话列表
const messages = computed(() => {
	if (!store.messageList.has(store.sessionSelectId)) return [];
	return store.messageList.get(store.sessionSelectId)!.messages;
});
// const messageList = store.messageList.get(store.sessionSelectId);

// 渲染时间每隔5分钟显示一次
const renderMessageDate = computed(() => {
	return (message: any, index: number, messages: Array<any>) => {
		if ((message && index === 0) || (message && message.timestamp - messages[index - 1].timestamp > 5 * 60 * 1000)) {
			return `- - ${formatTime(message.timestamp)} - -`;
		}
		return "";
	};
});
</script>

<style scoped lang="scss">
.emo-image {
	display: inline-block;
	width: 30px;
	height: 30px;
	vertical-align: middle;
}
.text {
	max-width: calc(100% - 140px);
	line-height: 20px;
	background: var(--ep-color-primary-light-7);
	:deep(p) {
		margin: 0;
	}
}
</style>
