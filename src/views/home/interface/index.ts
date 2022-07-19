/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-17 14:41:05
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-23 14:44:20
 */
export interface ViewCard {
	src: any;
	id: number;
	title?: string;
	content: string;
	owner_id: number;
	owner_name: string;
	owner_username: string;
	owner_avatar: string;
	star?: boolean;
	like: number;
	backgroundColor?: string;
	[attr: string]: any;
}

export interface CommentCard {
	ID: number;
	created_on: number;
	user_id: number;
	article_id: number;
	reply_id?: null;
	username: string;
	avatar?: any;
	content: string;
	like?: number;
	is_like?: boolean;
	replies?: CommentCard[];
}
interface Point {
	rowPerView: number;
}

export type Breakpoints = Record<number, Point>;

export interface WaterfallProps {
	breakpoints: Breakpoints;
	width: number;
	animationDuration: number;
	animationDelay: number;
	animationEffect: string;
	hasAroundGutter: boolean;
	gutter: number;
	list: ViewCard[];
	animationPrefix: string;
}

export interface ItemWidthProps {
	breakpoints: Breakpoints;
	wrapperWidth: number;
	gutter: number;
	hasAroundGutter: boolean;
	initWidth: number;
}

export interface ItemWidthByBreakpointProps extends ItemWidthProps {
	size: number;
}
