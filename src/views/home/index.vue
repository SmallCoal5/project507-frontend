<template>
	<div class="home_box">
		<Waterfall
			:list="Artile_list"
			:row-key="options.rowKey"
			:gutter="options.gutter"
			:has-around-gutter="options.hasAroundGutter"
			:width="options.width"
			:breakpoints="options.breakpoints"
			:img-selector="options.imgSelector"
			:animation-effect="options.animationEffect"
			:animation-duration="options.animationDuration"
			:animation-delay="options.animationDelay"
			:lazyload="options.lazyload"
			:load-props="options.loadProps"
		>
			<template #item="{ item, url }">
				<el-card class="pic-card" :body-style="{ padding: '0px' }">
					<!-- <div class="card"> -->
					<!-- <el-image @click="handlePreview(item, url)" :key="url" :src="url">
						<template #error>
							<div class="image-slot">
								<el-icon><icon-picture /></el-icon>
							</div>
						</template>
					</el-image> -->
					<LazyImg :url="url" @click="handlePreview(item, url)" />
					<div class="pic-info">
						<span>{{ item.title }}</span>
						<div class="bottom card-header">
							<div class="time">{{ item.data }}</div>
							<div class="like_content">
								<button class="btn_like" type="button" @click.stop="handleStar(item)">
									<div class="svg_wrap">
										<LikeFilled v-if="item.star"></LikeFilled>
										<Like v-else></Like>
									</div>
								</button>
								<div class="like_count">
									<span>{{ item.like }}</span>
								</div>
							</div>
						</div>
					</div>
					<!-- </div> -->
				</el-card>
			</template>
		</Waterfall>

		<div>
			<button @click="handleLoadMore(20)">加载更多</button>
		</div>
		<el-dialog v-model="previewVisible" :show-close="false">
			<div class="dialog-box">
				<ImageShow :url="previewURL" :srcList="srcList"></ImageShow>
				<Right :item="articleItem!" :commentitem="commentItem!"></Right>
			</div>
			<!-- <img style="width: 100%" :src="previewURL" /> -->
		</el-dialog>
		<!-- <Dialog :url="previewURL" :title="previewTitle" :visible="previewVisible"></Dialog> -->
	</div>
</template>

<script lang="ts" setup>
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/style.css";
import { onMounted, reactive, ref } from "vue";
import loading from "./assets/loading.png";
import error from "./assets/error.png";
import { getArtileList, handleStar } from "./api";
import { CommentCard, ViewCard } from "./interface";
// import { Star, StarFilled } from "@element-plus/icons-vue";
// import { Picture as IconPicture } from "@element-plus/icons-vue";
import { Like, LikeFilled } from "./icon";
import ImageShow from "./components/ImageShow.vue";
import Right from "./components/Right.vue";
import { getArticleCommentApi } from "@/api/modules/comment";
import { ElMessage } from "element-plus";

import { CommentStore, GlobalStore } from "@/store";
const store = CommentStore();
// 侧边栏控制
// const currentDate = new Date().toDateString();
// const loadingCard = ref(false);
const globalStore = GlobalStore();

function usePreview() {
	const previewVisible = ref(false);
	const previewTitle = ref<string | undefined>("");
	const previewURL = ref("");
	const srcList = ref<string[]>([]);
	const articleItem = ref<ViewCard>();
	const commentItem = ref<CommentCard[]>();
	// const commentleItem = ref<CommentCard>();
	const handlePreview = async (item: ViewCard, url: string) => {
		previewTitle.value = item.name;
		previewURL.value = url;
		previewVisible.value = true;
		srcList.value = [url, url];
		articleItem.value = item;

		const res = await getArticleCommentApi({ article_id: item.id, user_id: globalStore.uid });

		if (res.code == 200) {
			let temp: CommentCard[] = [];
			res.data?.datalist.forEach(item => {
				temp.push({
					ID: item.ID,
					created_on: item.created_on,
					user_id: item.user_id,
					article_id: item.article_id,
					username: item.username,
					content: item.content,
					like: item.like_count,
					is_like: item.is_like,
					avatar:
						"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202105%2F29%2F20210529001057_aSeLB.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660900218&t=bb2fcc1f70fedc4c7f8ef3710c05a6ac"
				});
			});
			store.setCurrentCommentList(temp);
			// commentItem.value = temp;
			// commentStore.currentCommentList = temp;
			console.log("获取评论列表", store.currentCommentList);
		} else {
			ElMessage.error("获取评论列表失败！");
		}
		// const res = await getCommentList(item.id);
		// if (res.code)
		// 	if (temp == null) {
		// 		temp = await getCommentList(2);
		// 		console.log("获取评论列表", commentItem.value);
		// 	} else commentItem.value = temp;
	};

	return {
		previewVisible,
		previewTitle,
		previewURL,
		srcList,
		articleItem,
		commentItem,
		handlePreview
	};
}
const { previewVisible, previewURL, srcList, articleItem, commentItem, handlePreview } = usePreview();

function useWaterfall() {
	const Artile_list = ref<ViewCard[]>([]);
	const options = reactive({
		// 唯一key值
		rowKey: "id",
		// 卡片之间的间隙
		gutter: 20,
		// 是否有周围的gutter
		hasAroundGutter: true,
		// 卡片在PC上的宽度
		width: 340,
		// 自定义行显示个数，主要用于对移动端的适配
		breakpoints: {
			1200: {
				// 当屏幕宽度小于等于1200
				rowPerView: 3
			},
			800: {
				// 当屏幕宽度小于等于800
				rowPerView: 3
			},
			500: {
				// 当屏幕宽度小于等于500
				rowPerView: 2
			}
		},
		// 动画效果
		animationEffect: "animate__fadeInUp",
		// 动画时间
		animationDuration: 1000,
		// 动画延迟
		animationDelay: 300,

		// imgSelector
		imgSelector: "src.original",
		// 加载配置
		loadProps: {
			loading,
			error
		},
		// 是否懒加载
		lazyload: true
	});

	onMounted(() => {
		handleLoadMore(20);
	});

	// 加载更多
	async function handleLoadMore(cnt: number) {
		Artile_list.value.push(...(await getArtileList(cnt)));
	}
	return {
		Artile_list,
		options,
		handleLoadMore
	};
}

// 列表
const { Artile_list, options, handleLoadMore } = useWaterfall();

// 侧边栏控制
// const { isOpen, handleToggleController } = useSlideBar();
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
