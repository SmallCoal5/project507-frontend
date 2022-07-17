<template>
	<div class="chat-session lg:w-30% w-100% p-8px box-border">
		<div class="session-search-box">
			<div class="search-icon">
				<Search style="width: 1em; height: 1em; margin-right: 8px" />
			</div>
			<input type="search" placeholder="搜索" autocomplete="off" class="search-input" spellcheck="false" data-ms-editor="true" />
		</div>
		<el-scrollbar max-height="100%">
			<!-- 会话列表 -->
			<template v-for="item in handleSessionList" :key="item">
				<div
					class="session-item cursor-pointer rounded-8px"
					:class="[item.id === store.sessionSelectId ? 'session-active' : '']"
					@click="selectSession()"
				>
					<div class="session-container">
						<el-badge>
							<el-avatar shape="square" class="!block" :size="40" fit="cover" :src="item.avatar" />
						</el-badge>
						<div class="w-50% ml-10px text-left">
							<div class="truncate">{{ item.username }}</div>
							<div class="truncate text-12px mt-2px" style="color: var(--ep-color-primary-light-3)">
								{{ getLastSession }}
							</div>
						</div>
					</div>
				</div>
			</template>
			<el-empty v-if="!handleSessionList.length" :image-size="100" description="消息列表为空" />
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
import { Search } from "@element-plus/icons-vue";
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
	console.log("返回会话列表", store.sessionList);
	return store.sessionList;
});
// 获取未读数量
// const getUnReadCount = null;
</script>

<style scoped lang="scss">
/* stylelint-disable-next-line scss/dollar-variable-pattern */
$selectBg: #f6f6f6;
.chat-session {
	:deep(p) {
		margin: 0;
	}

	border-right: 1px solid #e1e5e8;
	@media (max-width: 1024px) {
		border-right: none;
	}
	.session-search-box {
		position: sticky;
		display: flex;
		align-items: center;
		height: 64px;
		padding: 0 15px;
		.search-icon {
			position: absolute;
			left: 30px;
			display: flex;
			color: #a8aeb3;
			svg {
				width: 18px;
				height: 18px;
			}
		}
		.search-input {
			width: 100%;
			height: 38px;
			min-width: 10px;
			padding: 10px 10px 10px 40px;
			font-size: 15px;
			color: #0a0a0a;
			background: #ffffff;
			border: 1px solid #e1e5e8;
			border-radius: 4px;
			border-radius: 20px;
			outline: 0;
			caret-color: #0a0a0a;
		}
	}
	.session-item {
		position: relative;
		display: flex;
		align-items: center;
		min-height: 71px;
		padding: 0 14px;
		margin-bottom: 5px;
		transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
		flex: 1 1 100%;
		&:hover {
			background: $selectBg;
		}
		.session-container {
			display: flex;
			flex: 1;
			align-items: center;
			width: 100%;
		}
	}
	.session-active {
		background: #e5effa;
	}
}
</style>
