<template>
	<div class="header">
		<!-- <el-menu :default-active="activeIndex" class="el-menu-top" mode="horizontal" :ellipsis="false" @select="handleSelect">
				<el-menu-item index="1">
					<el-icon><HomeFilled /></el-icon>
					<span>主页</span>
				</el-menu-item>
				<el-menu-item index="2">
					<el-icon><View /></el-icon>
					<span>发现</span>
				</el-menu-item>
				<el-menu-item index="3">
					<el-icon><Shop /></el-icon>
					<span>闲置</span>
				</el-menu-item>
				<el-menu-item index="4">
					<el-icon><ChatLineSquare /></el-icon>
					<span>聊天</span>
				</el-menu-item>
			</el-menu> -->
		<div class="header-lf flx-center">
			<el-menu :default-active="activeIndex" class="el-menu-top" mode="horizontal" :ellipsis="false" @select="handleSelect">
				<el-menu-item index="1">
					<el-icon><HomeFilled /></el-icon>
					<span>主页</span>
				</el-menu-item>
				<el-menu-item index="2">
					<el-icon><View /></el-icon>
					<span>发现</span>
				</el-menu-item>
				<el-menu-item index="3">
					<el-icon><Shop /></el-icon>
					<span>闲置</span>
				</el-menu-item>
				<el-menu-item index="4">
					<el-icon><ChatLineSquare /></el-icon>
					<span>聊天</span>
				</el-menu-item>
			</el-menu>
		</div>
		<form class="nav-searchform">
			<el-autocomplete
				v-model="state2"
				:fetch-suggestions="querySearch"
				:trigger-on-focus="false"
				clearable
				class="nav-search-content"
				placeholder="Please Input"
				@select="handleSelectSuggest"
			/>
			<div class="nav-search-btn">
				<el-icon><Search /></el-icon>
			</div>
		</form>
		<div class="header-ri flx-center">
			<el-button :icon="Plus" class="icon-style" @click="addNew" text bg round></el-button>
			<!-- <Upload></Upload> -->
			<Language></Language>
			<!-- Theme -->
			<Theme></Theme>
			<Fullscreen></Fullscreen>
			<Avatar></Avatar>
		</div>
	</div>
	<UploadArticle ref="dialogRef"></UploadArticle>
</template>

<script setup lang="ts">
import { HomeFilled, View, ChatLineSquare, Plus, Search } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import Fullscreen from "./components/Fullscreen.vue";
import Avatar from "./components/Avatar.vue";
import Language from "./components/Language.vue";
import Theme from "./components/Theme.vue";
import UploadArticle from "@/components/UploadArticle/index.vue";
// import Upload from "./components/Upload.vue";
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
interface DialogExpose {
	acceptParams: () => void;
}
const dialogRef = ref<DialogExpose>();
const addNew = () => {
	dialogRef.value!.acceptParams();
};

interface RestaurantItem {
	value: string;
	link: string;
}

const state2 = ref("");

const restaurants = ref<RestaurantItem[]>([]);
const querySearch = (queryString: string, cb: any) => {
	const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value;
	// call callback function to return suggestions
	cb(results);
};
const createFilter = (queryString: string) => {
	return (restaurant: RestaurantItem) => {
		return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
	};
};
const loadAll = () => {
	return [
		{ value: "vue", link: "https://github.com/vuejs/vue" },
		{ value: "element", link: "https://github.com/ElemeFE/element" },
		{ value: "cooking", link: "https://github.com/ElemeFE/cooking" },
		{ value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
		{ value: "vuex", link: "https://github.com/vuejs/vuex" },
		{ value: "vue-router", link: "https://github.com/vuejs/vue-router" },
		{ value: "babel", link: "https://github.com/babel/babel" }
	];
};

const handleSelectSuggest = (item: RestaurantItem) => {
	console.log(item);
};

onMounted(() => {
	restaurants.value = loadAll();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
