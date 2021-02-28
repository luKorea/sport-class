import axios from "../../utils/axios";

let post = 'POST';


// 师生互评列表
export const getEvaluationList = params => {
	return axios({
		url: '/comment/commentlist',
		method: post,
		data: params
	})
}

//  师生互评详情
export const getEvaluationDetail = lessonrecordofstudentid => {
	return axios({
		url: '/comment/commentinfo',
		method: post,
		data: {
			lessonrecordofstudentid: lessonrecordofstudentid
		}
	})
}

// 删除老师已经评论的评语
export const deleteTeacherComment = commentid => {
	return axios({
		url: '/comment/deletecomment',
		method: post,
		data: {
			commentid: commentid
		}
	})
}

// 赠送小红花
export const sendAward = data => {
	return axios({
		url: '/comment/award',
		method: post,
		data: data
	})
}

// 老师点评
export const teacherComment = data => {
	return axios({
		url: '/comment/comment',
		method: post,
		data: data
	})
}



// 老师预设评语列表
export const getCommentaryList = () => {
	return axios({
		url: '/comment/commentarylist',
		method: post
	})
}

// 添加修改老师预设评语
export const addOrEditCommentary = data => {
	return axios({
		url: '/comment/commentary',
		method: post,
		data: data
	})
}
// 删除老师预设评语
export const removeCommentary = id => {
	return axios({
		url: '/comment/deletecommentary',
		method: post,
		data: {
			id: id
		}
	})
}
