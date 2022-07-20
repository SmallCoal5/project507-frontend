import { Message } from "@/api/interface/index";
export interface Message {
	from_id: number;
	to_id: number;
	content: string;
	image_url: string;
	created_on: number;
	status: number;
}
// export interface Messages {
// 	sessionId: number;
// 	avatar: string;
// 	name: string;
// 	msg: Message.ResMessages[];
// }

export interface Main {
	sessionList: Array<any>;
	sessionListOffset: number;
	sessionSelectId: number;
	allSessionList: Array<any>;
	allSessionSelectId: number;
	messageList: Map<number, Message.ResMessages>;
	sessionAvatar: string;
	// systemSession: Message.ResMessages;
	socket: any;
	sendInfo: any;
	emojiList: Array<any>;
}
