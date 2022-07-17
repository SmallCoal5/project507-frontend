import { ResPage, Message, User } from "@/api/interface/index";
import { API } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 消息管理模块
 */

// * 获取消息列表
export const getMessagesApi = (params: Message.ReqGetParams) => {
	return http.get<ResPage<Message.ResMessages>>(API + `/msg/history`, params);
};

// * 获取消息列表
export const getSessionsApi = (params: Message.ReqGetSessionParams) => {
	return http.get<ResPage<User.UserInfo>>(API + `/msg/session`, params);
};
