import { ResPage, Message } from "@/api/interface/index";
import { API } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 消息管理模块
 */

// * 获取文章列表
export const getMessagesApi = (params: Message.ReqGetParams) => {
	return http.get<ResPage<Message.ResMessages>>(API + `/msg/history`, params);
};
