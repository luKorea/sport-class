import axios from '../../utils/axios.js';

let post = "POST";


// 获取上课记录列表
export const getClassList = params => {
	return axios({
		url: '/lessontask/lessonlist',
		method: post,
		data: params
	})
}

// 获取上课记录详情数据
export const getClassDetail = lessontaskid => {
	return axios({
		url: '/lessontask/info',
		method: post,
		data: {
			lessontaskid: lessontaskid
		}
	})
}



// 获取约课记录列表
export const getAboutList = params => {
	return axios({
		url: '/lessontask/aboutclasslist',
		method: post,
		data: params
	})
}


// 获取缺课记录列表
export const getAbsentList = params => {
	return axios({
		url: '/lessontask/lacklist',
		method: post,
		data: params
	})
}

// 缺课记录中是否扣课时
export const setTime = params => {
	return axios({
		url: '/lessontask/updatestatus',
		method: post,
		data: params
	})
}


// 获取请假申请列表
export const getLeaveList = params => {
	return axios({
		url: '/askforleave/leavelist',
		method: post,
		data: params
	})
}
// 获取请假申请详情
export const getLeaveDetail = askforleaveid => {
	return axios({
		url: '/askforleave/info',
		method: post,
		data: {
			askforleaveid: askforleaveid
		}
	})
}

// 获取学员上课记录
export const getStudentLesson = studentid => {
	return axios({
		url: '/lessontask/getlist',
		method: post,
		data: {
			studentid: studentid
		}
	})
}

// 修改请假状态
export const setFlags = data => {
	return axios({
		url: '/askforleave/askforleavehandle',
		method: post,
		data: data
	})
}