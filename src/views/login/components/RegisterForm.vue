<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" placeholder="用户名">
				<template #prefix>
					<el-icon class="el-input__icon"><user /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input type="password" show-password v-model="loginForm.password" placeholder="密码">
				<template #prefix>
					<el-icon class="el-input__icon"><lock /></el-icon>
				</template>
			</el-input>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<!-- <el-button :icon="CircleClose" round @click="resetForm(loginFormRef)" size="large">注册</el-button> -->
		<el-button :icon="UserFilled" round @click="signup(loginFormRef)" size="large" type="primary" :loading="loading">
			注册
		</el-button>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from "vue";
// import { ref, reactive } from "vue";
// import { useRouter } from "vue-router";
import { Login } from "@/api/interface";
import { InjectProps } from "../interface/index";
import { UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import { ElMessage } from "element-plus";
import { signupApi } from "@/api/modules/login";
// import { GlobalStore } from "@/store";
import md5 from "js-md5";

// const globalStore = GlobalStore();

// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

// 登录表单数据
const loginForm = reactive<Login.ReqLoginForm>({
	username: "",
	password: ""
});
const loading = ref<boolean>(false);

// const router = useRouter();
// login
const signup = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (valid) {
			loading.value = true;
			try {
				let requestLoginForm: Login.ReqLoginForm = {
					username: loginForm.username,
					password: md5(loginForm.password)
				};
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const res = await signupApi(requestLoginForm);
				// const res = await signupApi(requestLoginForm);
				// console.log("响应数据", res.data);
				// globalStore.setToken(res.data!.access_token);
				ElMessage.success("注册成功！");
				isLogin.value = !isLogin.value;
				// provideState.changeType();
				// router.push({ name: "login" });
			} finally {
				loading.value = false;
			}
		}
	});
};

// resetForm
// const resetForm = (formEl: FormInstance | undefined) => {
// 	if (!formEl) return;
// 	formEl.resetFields();
// };

// * 以下数据都为自己测试使用，不参与功能开发
// inject
const isLogin = inject("isLogin") as InjectProps;
// console.log(isLogin.value);
// isLogin.value = !isLogin.value;
// provideState.changeType();
// provideState.changeName();

// 接收父组件参数（采用ts专有声明，有默认值）
// interface ParentProps {
// 	age?: string;
// 	address?: string[];
// 	obj?: {
// 		username: string;
// 		password: string;
// 	};
// }
// withDefaults(defineProps<ParentProps>(), {
// 	age: "18",
// 	address: () => ["天府广场", "天府三街"],
// 	obj: () => {
// 		return {
// 			username: "admin",
// 			password: "123456"
// 		};
// 	}
// });

// 接收父组件参数（采用ts专有声明，无默认值）
// const props1 = defineProps<{ item: string }>();

// 子组件向父组件传输数据（触发父组件的submitParent方法）
// const emit = defineEmits<{
// 	(e: "submitParent", LoginFrom: Login.ReqLoginForm): void;
// }>();

// const submitParent = () => {
// 	emit("submitParent", loginForm);
// };

// 子组件数据暴露给父组件
// const count = ref<number>(1);
// const consoleNumber = (name: string): void => {
// 	console.log("我是子组件打印的数据", name);
// };
// defineExpose({
// 	count,
// 	consoleNumber
// });
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
