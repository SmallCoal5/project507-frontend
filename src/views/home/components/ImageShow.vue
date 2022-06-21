<template>
	<div class="left-box">
		<el-carousel arrow="hover" :autoplay="false" :height="dialogHeight">
			<el-carousel-item v-for="imgurl in srcList" :key="imgurl">
				<el-image style="width: 100%" :src="imgurl" fit="cover" />
			</el-carousel-item>
		</el-carousel>
	</div>
	<!-- <img style="width: 100%" :src="url" /> -->
</template>

<script setup lang="ts" name="cardDialog">
import { onMounted, ref } from "vue";
// const imgRef = ref();
interface DialogProps {
	url: string;
	srcList: string[];
}
withDefaults(defineProps<DialogProps>(), {
	// title: "",
	url: "",
	srcList: () => []
});
const dialogHeight = ref("100px");
onMounted(() => {
	fixHeight();
	window.onresize = () => {
		fixHeight();
	};
});
const fixHeight = () => {
	dialogHeight.value = document.documentElement.clientHeight * 0.96 + "px";
};
</script>
<style scoped lang="scss">
@import "../index.scss";
</style>
