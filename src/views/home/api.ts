/*
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-14 13:34:56
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-24 14:25:30
 */

import { Article } from "@/api/interface";
import { getArticleListApi, getArticleCommentApi } from "@/api/modules/article";
// import axios from "axios";
import { CommentCard, ViewCard } from "./interface";
import { formatTime } from "./utils";
/**
 * 获取随机ID
 * @param {*} length
 * @returns
 */
export function randomID(length = 6) {
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

const COLORS = ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C", "#909399"];

function getRandomNum(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
	return COLORS[getRandomNum(0, 4)];
}

let start = 0;
export async function getArtileList(pageSize = 1) {
	const end = start + pageSize;
	const list: ViewCard[] = [];
	let params: Article.ReqGetArticleParams = {
		pageNum: 0,
		pageSize: pageSize
	};
	const res = await getArticleListApi(params);
	res.data?.datalist.forEach(item => {
		list.push({
			id: item.id,
			star: item.is_like,
			like: item.like_count,
			src: {
				// original: Math.random() < 0.95 ? successURL : errorURL
				original: `/base/` + item.images[0].url
			},
			backgroundColor: randomColor(),
			title: item.title,
			content: item.content,
			data: formatTime(item.created_on * 1000),
			owner_id: item.owner_id,
			owner_name: item.owner_name,
			owner_username: item.owner_username,
			owner_avatar: item.owner_avatar
		});
	});
	start = end + 1;
	return list;
}

export async function getCommentList(id: number) {
	// const end = start + pageSize;
	let params: Article.Comments = {
		article_id: id
	};
	const res = await getArticleCommentApi(params);
	console.log("res", res);
	console.log("id", id);
	if (res.data?.datalist.length == 0) {
		return null;
	} else {
		const list: CommentCard[] = [
			{
				ID: res.data!.datalist[0].ID,
				created_on: res.data!.datalist[0].created_on,
				user_id: res.data!.datalist[0].user_id,
				// article_id: res.data!.datalist[0].article_id,
				article_id: id,
				reply_id: res.data!.datalist[0]!.reply_id,
				username: res.data!.datalist[0].username,
				avatar: res.data!.datalist[0].avatar,
				content: res.data!.datalist[0].content,
				replies: res.data!.datalist[0].replies
			}
		];
		return list;
	}
}
