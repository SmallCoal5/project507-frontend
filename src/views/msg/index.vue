<template>
	<el-row type="flex" class="w-full border-rounded-33px">
		<!-- 会话区域 -->
		<ChatDomain class="lg:block hidden" />
		<!-- 聊天区域 -->
		<ChatContent />
	</el-row>
</template>

<script setup lang="ts">
import ChatContent from "./components/ChatContent.vue";
import ChatDomain from "./components/ChatDomain.vue";

// const screenHeight = computed((): string => (isDevice.value ? window.innerHeight + "px" : "calc(100vh - 80px)"));
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
