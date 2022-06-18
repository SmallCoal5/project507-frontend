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
				<el-skeleton :loading="loadingCard" animated>
					<template #template>
						<el-skeleton-item variant="image" style="width: 240px; height: 240px" />
						<div style="padding: 14px">
							<el-skeleton-item variant="h3" style="width: 50%" />
							<div style="display: flex; align-items: center; height: 16px; margin-top: 16px; justify-items: space-between">
								<el-skeleton-item variant="text" style="margin-right: 16px" />
								<el-skeleton-item variant="text" style="width: 30%" />
							</div>
						</div>
					</template>
					<template #default>
						<el-card class="pic-card" :body-style="{ padding: '0px' }">
							<div class="pic-show">
								<LazyImg :url="url" @click="handlePreview(item, url)" />
							</div>
							<div class="pic-info">
								<span>{{ item.name }}</span>
								<div class="bottom card-header">
									<div class="time">{{ currentDate }}</div>
									<button class="btn_like" type="button" @click.stop="handleStar(item)">
										<div class="svg_wrap">
											<Like></Like>
										</div>
									</button>
								</div>
							</div>
						</el-card>
					</template>
				</el-skeleton>
			</template>
		</Waterfall>

		<div>
			<button @click="handleLoadMore">加载更多</button>
		</div>
		<el-dialog v-model="previewVisible" :title="previewTitle" width="800px">
			<img style="width: 100%" :src="previewURL" />
		</el-dialog>
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
import Like from "./icon/Like.vue";

// 侧边栏控制
const currentDate = new Date().toDateString();
const loadingCard = ref(false);
function usePreview() {
	const previewVisible = ref(false);
	const previewTitle = ref<string | undefined>("");
	const previewURL = ref("");

	const handlePreview = (item: ViewCard, url: string) => {
		previewTitle.value = item.name;
		previewURL.value = url;
		previewVisible.value = true;
	};

	return {
		previewVisible,
		previewTitle,
		previewURL,
		handlePreview
	};
}

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
		width: 320,
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
		handleLoadMore();
	});

	// 加载更多
	function handleLoadMore() {
		list.value.push(...getList(30));
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
	item.star = !item.star;
}
const { previewVisible, previewTitle, previewURL, handlePreview } = usePreview();
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
