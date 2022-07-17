import { defineStore } from "pinia";
import { Main } from "./interface";
export const MsgStore = defineStore({
	id: "msg",
	state: (): Main => {
		return {
			sessionList: [],
			sessionSelectId: 0,
			sessionListOffset: 0,
			allSessionList: [],
			allSessionSelectId: 0,
			messageList: new Map(),
			sessionAvatar: "",
			socket: null,
			sendInfo: null,
			emojiList: []
		};
	},
	actions: {
		// 本地新增信息记录
		sendLocal() {}
	}
});
