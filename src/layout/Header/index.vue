<template>
	<div class="header">
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

		<div class="header-ri flx-center">
			<Language></Language>
			<!-- Theme -->
			<Theme></Theme>
			<Fullscreen></Fullscreen>
			<Avatar></Avatar>
		</div>
	</div>
</template>

<script setup lang="ts">
import { HomeFilled, View, ChatLineSquare } from "@element-plus/icons-vue";
import { ref } from "vue";
import Fullscreen from "./components/Fullscreen.vue";
import Avatar from "./components/Avatar.vue";
import Language from "./components/Language.vue";
import Theme from "./components/Theme.vue";
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
