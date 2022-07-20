import { defineStore } from "pinia";
import { Main } from "./interface";
export const MsgStore = defineStore({
	id: "msg",
	state: (): Main => {
		return {
			sessionList: [],
			sessionSelectId: 0,
			sessionName: "",
			sessionAvatar: "",
			sessionListOffset: 0,
			sessionSelected: null,
			messageList: new Map(),
			socket: null,
			onlineStatus: false,
			sendInfo: null,
			emojiList: [],
			chatScrollbar: null,
			chatEditor: null,
			editor: null,
			editorData: null,
			beforePullDown: true,
			isPullingDown: false
		};
	},
	actions: {
		// 本地新增信息记录
		sendLocal() {},
		// 初始化编辑器

		// 设置会话窗口到达底部
		toBottom() {
			// this.chatScrollbar?.setScrollTop(9999);
			const timer = setTimeout(() => {
				// this.chatScrollbar?.setScrollTop(9999);
				this.chatScrollbar.scrollTo(0, this.chatScrollbar.maxScrollY);
				clearTimeout(timer);
			}, 100);
		}
	}
});
