<template>
	<div class="home_box">
		<Waterfall
			:list="list"
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
						<span>{{ item.name }}</span>
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
				<Right :item="articleItem!"></Right>
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
import { getList } from "./api";
import { ViewCard } from "./interface";
// import { Star, StarFilled } from "@element-plus/icons-vue";
// import { Picture as IconPicture } from "@element-plus/icons-vue";
import { Like, LikeFilled } from "./icon";
import ImageShow from "./components/ImageShow.vue";
import Right from "./components/Right.vue";
// 侧边栏控制
// const currentDate = new Date().toDateString();
// const loadingCard = ref(false);
function usePreview() {
	const previewVisible = ref(false);
	const previewTitle = ref<string | undefined>("");
	const previewURL = ref("");
	const srcList = ref<string[]>([]);
	const articleItem = ref<ViewCard>();
	const handlePreview = (item: ViewCard, url: string) => {
		previewTitle.value = item.name;
		previewURL.value = url;
		previewVisible.value = true;
		srcList.value = [url, url];
		articleItem.value = item;
	};

	return {
		previewVisible,
		previewTitle,
		previewURL,
		srcList,
		articleItem,
		handlePreview
	};
}
const { previewVisible, previewURL, srcList, articleItem, handlePreview } = usePreview();

function useWaterfall() {
	const list = ref<ViewCard[]>([]);
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
		list.value.push(...(await getList(cnt)));
	}

	return {
		list,
		options,
		handleLoadMore
	};
}

// 列表
const { list, options, handleLoadMore } = useWaterfall();

// 侧边栏控制
// const { isOpen, handleToggleController } = useSlideBar();
function handleStar(item: ViewCard) {
	if (item.star) {
		item.like -= 1;
	} else {
		item.like += 1;
	}
	item.star = !item.star;
}
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
