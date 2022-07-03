<template>
	<div class="right-box">
		<div class="article-box" id="article-box">
			<div class="user">
				<div class="user-avatar">
					<el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
				</div>
				<div class="userinfo">
					<div class="username">Username</div>
					<div class="time">{{ currentDate }}</div>
				</div>
				<div class="follow">
					<el-button class="follow-btn" round>+关注</el-button>
				</div>
			</div>
			<div class="article-content">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
			<div class="tag-list">
				<el-button class="tag-box" type="primary" v-for="tag in tags" :key="tag" link>
					{{ tag }}
				</el-button>
			</div>
			<div class="operation-list">
				<div class="op-box">
					<button class="op-btn">
						<el-icon :size="22"><Share /></el-icon>
						<div class="op-name">分享</div>
					</button>
				</div>
				<div class="op-box">
					<button class="op-btn">
						<el-icon :size="22"><ChatDotSquare /></el-icon>
						<div class="op-name">评论</div>
					</button>
				</div>
				<div class="op-box">
					<button class="op-btn op-like-btn" @click.stop="handleStar(props.item)">
						<el-icon class="op-icon" :size="22"> <LikeFilled v-if="item.star"></LikeFilled> <Like v-else></Like> </el-icon>
						<div class="op-name like_count">{{ item.like }}</div>
					</button>
				</div>
			</div>
		</div>
		<div class="comment-box" id="comment-box">
			<div class="header">评论</div>
			<div class="divider"></div>
			<div class="suggest" v-if="commentList.length <= 0">
				<el-icon :size="40" class="hint-icon"><WarningFilled /></el-icon>
				<div class="hint">快来发表你的评论吧</div>
			</div>
			<el-scrollbar class="comment-list" :height="scrollHeight" v-else>
				<div class="comment-item" v-for="comment in commentList" :key="comment.id">
					<div class="comment-left">
						<el-avatar :src="comment.avater" />
					</div>
					<div class="comment-right">
						<div class="content">
							<span class="username">{{ comment.user }} </span> {{ comment.content }}
						</div>
						<div class="bottom">
							<div class="time">{{ comment.create_time }}</div>
							<div class="reply">
								<button class="cm-btn">
									<!-- <el-icon :size="13"><ChatDotSquare /></el-icon> -->
									<div>回复</div>
								</button>
							</div>
							<button class="cm-btn cm-like-btn" @click.stop="handleCommentLike(comment)">
								<el-icon :size="13"><ThumbFilled v-if="comment.is_like"></ThumbFilled> <Thumb v-else></Thumb></el-icon>
								<div class="like_count">{{ comment.like }}</div>
							</button>
						</div>
					</div>
				</div>
			</el-scrollbar>
		</div>
		<el-divider />
		<div class="comment-input" id="comment-input">
			<div class="input-box"><el-input v-model="commentInput" autosize type="textarea" placeholder="添加评论..." /></div>
			<el-button class="submit-btn" round>发表</el-button>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, onUpdated, ref } from "vue";
import { Share, ChatDotSquare, WarningFilled } from "@element-plus/icons-vue";
import { Like, LikeFilled, Thumb, ThumbFilled } from "../icon";
import { ViewCard, CommentCard } from "../interface";
interface ArticleProps {
	item: ViewCard;
}
const props = withDefaults(defineProps<ArticleProps>(), {
	// title: "",
});
const currentDate = new Date().toLocaleString();
const commentList = ref<CommentCard[]>([]);
const tags = ref<Array<string>>([
	"Tag 1",
	"Tag 2",
	"Tag 3",
	"Tag 4",
	"Tag 5",
	"Tag 4",
	"Tag 4",
	"Tag 4",
	"Tag 4",
	"Tag 4",
	"Tag 4"
]);
const commentInput = ref("");
function handleStar(item: ViewCard) {
	const _item = item;
	if (_item.star) {
		_item.like -= 1;
	} else {
		_item.like += 1;
	}
	_item.star = !_item.star;
}
function handleCommentLike(item: CommentCard) {
	if (item.is_like) {
		item.like -= 1;
	} else {
		item.like += 1;
	}
	item.is_like = !item.is_like;
}
const scrollHeight = ref("100px");
nextTick(() => {
	fixHeight();
});
onMounted(() => {
	handleLoadMore();
	window.onresize = () => {
		fixHeight();
	};
});
onUpdated(() => {
	// fixHeight();
});
const fixHeight = () => {
	scrollHeight.value = document.getElementById("comment-box")!.offsetHeight - 45 + "px";
	console.log("scrollHeight.value", scrollHeight.value);
};
function handleLoadMore() {
	commentList.value.push(...getList(10));
}

let start = 0;
function getList(pageSize = 10) {
	const end = start + pageSize;
	const list: CommentCard[] = [];
	for (let i = start; i <= end; i++) {
		list.push({
			id: "" + i,
			user: "User" + i,
			content: "评论" + i + "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
			like: 99,
			is_like: false,
			avater: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
			create_time: new Date().toLocaleString()
		});
	}
	start = end + 1;
	return list;
}
</script>
<style scoped lang="scss">
@import "../index.scss";
</style>
