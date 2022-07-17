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
	let params: Article.ReqGetArticleParams = {
		pageNum: 0,
		pageSize: pageSize
	};
	const res = await getArticleListApi(params);
	console.log("res", res);
	res.data?.datalist.forEach(item => {
		list.push({
			id: item.ID,
			star: item.is_like,
			like: item.like_count,
			src: {
				// original: Math.random() < 0.95 ? successURL : errorURL
				original: `/base/` + item.images[0].url
			},
			backgroundColor: randomColor(),
			name: item.title,
			data: formatTime(item.created_on)
		});
	});
	start = end + 1;
	return list;
}
