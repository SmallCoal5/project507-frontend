<template>
	<footer class="px-20px">
		<!--工具栏-->
		<el-row type="flex" class="mb-10px">
			<el-popover placement="top" popper-class="chat-icon-popover" trigger="click">
				<template #reference>
					<div class="text-20px cursor-pointer dark:filter-invert-100">
						<img width="24" height="24" class="block" src="@/assets/emoji.svg" />
					</div>
				</template>
				<el-scrollbar class="emoji" height="150px">
					<ul class="m0 p0 pr-2px flex flex-wrap">
						<li
							v-for="item in store.emojiList"
							:key="item.title"
							class="p-5px list-none hover:animate-heart-beat animate-count-animated animate-duration-1s cursor-pointer"
							:title="item.title"
						>
							<img width="30" height="30" :src="item.icon" @click="selectIcon()" />
						</li>
					</ul>
				</el-scrollbar>
			</el-popover>
			<div class="ml-10px text-20px i-ep-picture-rounded !cursor-pointer">
				<input
					ref="referenceUpload"
					class="opacity-0"
					name="customerService"
					type="file"
					value=""
					accept="image/*"
					@change="sendImage"
				/>
			</div>
			<div class="ml-10px text-20px i-ep-video-camera !cursor-pointer">
				<input
					ref="referenceUploadVideo"
					class="opacity-0"
					name="customerService"
					type="file"
					value=""
					accept="video/*"
					@change="sendVideo"
				/>
			</div>
		</el-row>
		<ChatEditor
			v-model="store.sendInfo"
			ref="editor"
			id="chatEditor"
			:height="135"
			class="answer-editor"
			placeholder="请输入聊天"
		></ChatEditor>
	</footer>
</template>

<script setup lang="ts">
import { MsgStore } from "..";
import ChatEditor from "./ChatEditor.vue";
// import { ElMessage } from "element-plus";
import { ref } from "vue";
// const { proxy }: any = getCurrentInstance();
const store = MsgStore();
const editor = ref(null);
defineProps<{
	value: string;
	id: string;
	height: number;
}>();
// 选择表情
function selectIcon() {}

// function blurHighLight() {}
function sendImage() {}
function sendVideo() {}
</script>
