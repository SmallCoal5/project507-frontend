<template>
	<div class="chat-session lg:w-20% w-70% p-8px box-border">
		<el-scrollbar max-height="100%">
			<!-- 会话列表 -->
			<template v-for="item in handleSessionList" :key="item">
				<div v-if="true" @click="selectSession()">
					<el-row type="flex" align="middle">
						<el-badge>
							<el-avatar shape="square" class="!block" :size="40" fit="cover" :src="item.avatar" />
						</el-badge>
						<div class="w-50% ml-10px text-left">
							<div class="truncate">{{ item.email }}</div>
							<div class="truncate text-12px mt-2px" style="color: var(--ep-color-primary-light-3)">
								{{ getLastSession }}
							</div>
						</div>
					</el-row>
				</div>
			</template>
			<el-empty v-if="!handleSessionList.length" :image-size="100" description="好友列表为空" />
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { Message } from "@/api/interface";
import { getMessagesApi } from "@/api/modules/msg";
import { GlobalStore } from "@/store";
import { ElMessage } from "element-plus";
import { computed } from "vue";
import { MsgStore } from "..";

const store = MsgStore();
const globalStore = GlobalStore();
// 选择聊天用户
async function selectSession() {
	if (!store.messageList.has(store.sessionSelectId)) {
		let params: Message.ReqGetParams = {
			from_uid: globalStore.uid,
			to_uid: store.sessionSelectId,
			pageNum: 0,
			pageSize: 10
		};
		const res = await getMessagesApi(params);
		if (res.code === "200") {
			store.messageList.set(store.sessionSelectId, res.data!.datalist[0]);
			console.log("获取会话消息", "sessionSelectId", store.sessionSelectId, store.messageList.get(store.sessionSelectId));
		} else {
			ElMessage.error("获取会话消息失败！");
		}
	}
}
// 获取最后一条消息内容
const getLastSession = computed(() => {
	return "最后一条消息";
});
// 返回对应选择列表
const handleSessionList = computed(() => {
	return store.sessionList;
});
// 获取未读数量
// const getUnReadCount = null;
</script>

<style scoped lang="scss">
/* stylelint-disable-next-line scss/dollar-variable-pattern */
$selectBg: var(--ep-color-primary-light-9);
.chat-session {
	:deep(p) {
		margin: 0;
	}

	border-right: 1px solid var(--ep-border-color);
	@media (max-width: 1024px) {
		border-right: none;
	}
	.session-item {
		&:hover {
			background: $selectBg;
		}
	}
	.session-active {
		background: $selectBg;
	}
}
</style>
