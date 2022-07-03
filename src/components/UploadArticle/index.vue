<template>
	<div>
		<el-dialog v-model="dialogFormVisible" title="上传动态" :destroy-on-close="true" width="620px" draggable>
			<el-form ref="formRef" :model="articleForm" :rules="rules" class="drawer-multiColumn-form" label-width="100px">
				<el-form-item label="标题 :" prop="title">
					<el-input v-model="articleForm.title" />
				</el-form-item>
				<el-form-item label="内容 :" prop="content">
					<el-input v-model="articleForm.content" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
				</el-form-item>
				<el-form-item label="标签">
					<el-tag
						v-for="tag in dynamicTags"
						:key="tag"
						class="tag"
						closable
						:disable-transitions="false"
						@close="handleTagClose(tag)"
					>
						{{ tag }}
					</el-tag>
					<el-input
						v-if="tagInputVisible"
						ref="tagInputRef"
						v-model="tagInputValue"
						class="tag-input"
						size="small"
						@keyup.enter="handleTagInputConfirm"
						@blur="handleTagInputConfirm"
					/>
					<el-button v-else class="btn-tag-input" size="small" @click="showTagInput"> + 标签 </el-button>
				</el-form-item>
				<el-form-item label="上传图片">
					<UploadImg ref="uploadImgRef"></UploadImg>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm(formRef)">提交</el-button>
					<el-button @click="resetForm(formRef)">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script setup lang="ts">
import { nextTick, provide, reactive, ref } from "vue";
import { ElInput, ElMessage, FormInstance, FormRules, UploadFile } from "element-plus";
import UploadImg from "@/components/UploadArticle/UploadImg.vue";
import { UploadImgExpose } from "@/views/admin/components/interface";
import { Article } from "@/api/interface";
import { GlobalStore } from "@/store";
import { addArticleApi } from "@/api/modules/article";
const dialogFormVisible = ref<boolean>(false);

const acceptParams = () => {
	dialogFormVisible.value = true;
};

const rules = reactive<FormRules>({
	title: [
		{ required: true, message: "请输入标题", trigger: "blur" },
		{ min: 3, max: 20, message: "长度必须大于3小于20", trigger: "blur" }
	],
	content: [
		{ required: true, message: "请输入内容", trigger: "blur" },
		{ min: 3, max: 200, message: "长度必须大于3小于200", trigger: "blur" }
	]
});

const formRef = ref<FormInstance>();

const articleForm = reactive<Article.ReqAddArticleParams>({
	title: "",
	content: "",
	user_id: GlobalStore().uid,
	tags: []
});
provide("articleForm", articleForm);
const uploadImgRef = ref<UploadImgExpose | null>(null);
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate(async (valid, fields) => {
		if (valid) {
			console.log("submit!");
			articleForm.tags = dynamicTags.value;
			// await uploadImgRef.value?.uploadRef.submit();

			let formData = new FormData();

			if (uploadImgRef.value?.files) {
				uploadImgRef.value?.files.forEach((file: UploadFile) => {
					formData.append("images", file.raw!);
				});
			}

			// formData.append("images", param.files);
			articleForm.tags.forEach(tag => {
				formData.append("tag_name", tag);
			});
			// formData.append("tag_name", articleForm.tags as unknown as Blob);
			formData.append("title", articleForm.title);
			formData.append("content", articleForm.content);
			formData.set("user_id", articleForm.user_id);
			const res = await addArticleApi(formData);
			ElMessage.success("上传成功！");
			console.log(res);
		} else {
			console.log("error submit!", fields);
			return false;
		}
		dialogFormVisible.value = false;
	});
};

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

const tagInputValue = ref("");
const dynamicTags = ref<string[]>([]);
const tagInputVisible = ref(false);
const tagInputRef = ref<InstanceType<typeof ElInput>>();

const showTagInput = () => {
	tagInputVisible.value = true;
	nextTick(() => {
		tagInputRef.value!.input!.focus();
	});
};

const handleTagInputConfirm = () => {
	if (tagInputValue.value) {
		if (dynamicTags.value.indexOf(tagInputValue.value) !== -1) {
			ElMessage.error("标签重复");
		} else {
			dynamicTags.value!.push(tagInputValue.value);
		}
	}
	tagInputVisible.value = false;
	tagInputValue.value = "";
};

const handleTagClose = (tag: string) => {
	dynamicTags.value!.splice(dynamicTags.value!.indexOf(tag), 1);
};

defineExpose({
	acceptParams
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
