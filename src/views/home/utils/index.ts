export function formatTime(created_data: string) {
	//时间戳
	const date_temp = new Date(parseInt(created_data) * 1000);
	const y = date_temp.getFullYear();
	let m: string | number = date_temp.getMonth() + 1;
	m = m < 10 ? `0${String(m)}` : m;
	let d: string | number = date_temp.getDate();
	d = d < 10 ? `0${String(d)}` : d;
	let h: string | number = date_temp.getHours();
	h = h < 10 ? `0${String(h)}` : h;
	let minute: string | number = date_temp.getMinutes();
	minute = minute < 10 ? `0${String(minute)}` : minute;
	let second: string | number = date_temp.getSeconds();
	second = second < 10 ? `0${String(second)}` : second;
	return `${String(y)}-${String(m)}-${String(d)} ${String(h)}:${String(minute)}:${String(second)}`;
}
