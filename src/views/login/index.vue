<template>
	<div class="login-container flx-center">
		<SwitchDark class="dark"></SwitchDark>
		<div class="login-content">
			<!-- <div class="login-left">
				<img src="@/assets/images/login_left0.png" alt="login" />
			</div> -->
			<div class="box">
				<div class="login-box" :class="{ active: isLogin }">
					<!-- <img class="login-img" src="@/assets/images/form_icon.png" alt="form_icon" /> -->
					<div class="login-form" v-if="isLogin">
						<div class="login-logo">
							<!-- <img class="login-icon" src="@/assets/images/logo.svg" alt="" /> -->
							<p class="logo-text">你好，朋友!</p>
						</div>
						<RegisterForm ref="loginRef" :age="'20'" :address="['天府三街', '天府四街']" :obj="obj"></RegisterForm>
					</div>
					<div class="login-form" v-else>
						<div class="login-logo">
							<!-- <img class="login-icon" src="@/assets/images/logo.svg" alt="" /> -->
							<p class="logo-text">Project-507</p>
						</div>
						<LoginForm ref="loginRef" :age="'20'" :address="['天府三街', '天府四街']" :obj="obj"></LoginForm>
					</div>
				</div>
				<div class="small-box" :class="{ active: isLogin }">
					<div class="small-contain" key="smallContainRegister" v-if="isLogin">
						<img class="login-icon" src="@/assets/images/logo.svg" alt="" />
						<el-button class="sbutton" round @click="changeType" size="large">登录</el-button>
						<el-button class="sbutton" round @click="changeType" size="large">游客</el-button>
					</div>
					<div class="small-contain" key="smallContainLogin" v-else>
						<img class="login-icon" src="@/assets/images/logo.svg" alt="" />
						<el-button class="sbutton" round @click="changeType" size="large">注册</el-button>
						<el-button class="sbutton" round @click="changeType" size="large">游客</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="square">
			<ul>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
		<div class="circle">
			<ul>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
import SwitchDark from "@/components/SwitchDark/index.vue";
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import { LoginFormExpose } from "./interface/index";
import { Login } from "@/api/interface/index";
import { ref, reactive, provide } from "vue";

// * 以下数据都为自己测试使用，不参与功能开发
// 使用provide传方法
let phone = ref<string>("iphone");
// provide
provide("provideState", {
	name: "liutao",
	age: "20",
	changeName: () => {
		// console.log(phone.value);
		setTimeout(() => {
			phone.value = "huawei";
			// console.log(phone.value);
		}, 1000);
	}
});

// 传给子组件方法（submitParent）
// const submitParent = (LoginFrom: Login.ReqLoginForm) => {
// 	console.log(LoginFrom);
// };

// 使用子组件数据
const loginRef = ref<LoginFormExpose | null>(null);
// const consoleRef = () => {
// 	console.log(loginRef.value?.count);
// 	loginRef.value?.consoleNumber("liutao");
// };

// 定义数据类型两种方法
// const item: Ref<string> = ref("111");
// const item1 = ref<number>(111);

const obj = reactive<Login.ReqLoginForm>({
	username: "admin",
	password: "123456"
});
// 使用toRefs解构数据（在template中直接用）
// const { username, password } = toRefs(obj);
const isLogin = ref<boolean>(false);
const changeType = () => {
	isLogin.value = !isLogin.value;
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
