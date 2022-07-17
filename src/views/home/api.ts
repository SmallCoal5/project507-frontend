/*
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-10-14 13:34:56
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-24 14:25:30
 */

import { Article } from "@/api/interface";
import { getArticleListApi } from "@/api/modules/article";
// import axios from "axios";
import { ViewCard } from "./interface";
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
export async function getList(pageSize = 1) {
	const end = start + pageSize;
	const list: ViewCard[] = [];
	let image_list: string[] = [];
	let name_list: string[] = [];
	let data_list: string[] = [];
	let likes_list: number[] = [];
	let params: Article.ReqGetArticleParams = {
		pageNum: 0,
		pageSize: pageSize
	};
	const res = await getArticleListApi(params);
	console.log("res", res);
	res.data?.datalist.forEach(item => {
		// 文章url
		image_list.push(item.images[0].url);
		//文章名
		name_list.push(item.title);
		//时间戳
		data_list.push(formatTime(item.created_on));
		// 点赞数
		likes_list.push(item.like_count);
	});
	for (let i = start; i <= 2; i++) {
		const successURL = `/base/` + image_list[i];
		// const errorURL = "https://api.mz-moe.cn/img/img00000.jpg";
		list.push({
			id: randomID(),
			star: false,
			like: likes_list[i],
			src: {
				// original: Math.random() < 0.95 ? successURL : errorURL
				original: successURL
			},
			backgroundColor: randomColor(),
			name: name_list[i],
			data: data_list[i]
		});
	}
	start = end + 1;
	return list;
}
