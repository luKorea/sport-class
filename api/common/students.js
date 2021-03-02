import axios from "../../utils/axios";

let post = 'POST';

// 获取学员列表
export const getStudentsList = params => {
    return axios({
        url: '/student/list1',
        method: post,
        data: params
    })
}

// 添加修改学员
export const addOrEditStudent = data => {
	return axios({
		url: '/student/operatorstudent',
		method: post,
		data: data
	})
}



// 获取学员详情
export const getStudentsDetail = id => {
	return axios({
		url: '/student/info',
		method: post,
		data: {
			id: id
		}
	})
}


//  获取机构入驻学校列表
export const getOrganize = () => {
	return axios({
		url: '/organize/get430configure',
		method: post
	})
}


//  获取学员报读班级下报读的课程
export const getReportList = params => {
	return axios({
		url: '/student/listbycourse',
		method: post,
		data: params
	})
}

// 获取学员报读班级下 课程下的班级
export const getReportClassList = ids => {
	return axios({
		url: '/student/classlist',
		method: post,
		data: {ids: ids}
	})
}

//  学员选班操作
export const getSelectClassList = params => {
	return axios({
		url: '/class/list',
		method: post,
		data: params
	})
}

// 学员添加班级操作
export const addStudentToClass = data => {
	return axios({
		url: '/class/addstudent',
		method: post,
		data: data
	})
}


// 学员退班操作
export const removeStudentClass = params => {
	return axios({
		url: '/class/deletemember',
		method: post,
		data: params
	})
}




// 获取学员跟进记录
export const getStudentFollow = studentid => {
	return axios({
		url: '/student/followup',
		method: post,
		data: {
			studentid:studentid
		}
	})
}

// 添加学员跟进记录
export const addOrEditStudentFollow = params => {
	return axios({
		url: '/student/addfollowup',
		method: post,
		data: params
	})
}



// 获取学员报名记录
export const getStudentsRecording = params => {
    return axios({
        url: '/student/orderlist',
        method: post,
        data: params
    })
}