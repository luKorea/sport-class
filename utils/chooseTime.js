export const chooseTime = (obj, time) => {
	const starts = new Date();
	let end = new Date().getTime();
	let newEnd = new Date(end)
	let bmonth = starts.getMonth() + 1
	let bday = starts.getDate()
	let emonth = newEnd.getMonth() + 1
	let eday = newEnd.getDate()
	let Year = new Date().getFullYear();
	let num = Year % 4 == 0 && Year % 100 != 0 || Year % 400 == 0 ? 366 : 365;
	switch (time) {
		case '0':
			obj['btime'] = `${starts.getFullYear()}/${starts.getMonth()+1}/1`
			obj['etime'] = `${starts.getFullYear()}/${starts.getMonth()+1}/${starts.getDate()}`
			break;
		case '1':
			end = new Date().getDay() == 1 ? starts.getTime() : (starts.getTime() - new Date().getDay() * 24 * 3600 * 1000) //本周有问题
			newEnd = new Date(end)
			bmonth = starts.getMonth() + 1
			bday = starts.getDate()
			emonth = newEnd.getMonth() + 1
			eday = newEnd.getDate()
			obj['btime'] = `${starts.getFullYear()}-${bmonth>10?bmonth:'0'+bmonth}-${bday>10?bday:'0'+bday}`
			obj['etime'] = `${newEnd.getFullYear()}-${emonth>10?emonth:'0'+emonth}-${eday>10?eday:'0'+eday}`
			break;
		case '2':
			end = starts.getTime() - 30 * 24 * 3600 * 1000
			newEnd = new Date(end)
			bmonth = starts.getMonth() + 1
			bday = starts.getDate()
			emonth = newEnd.getMonth() + 1
			eday = newEnd.getDate()
			obj['btime'] = `${starts.getFullYear()}-${bmonth>10?bmonth:'0'+bmonth}-${bday>10?bday:'0'+bday}`
			obj['etime'] = `${newEnd.getFullYear()}-${emonth>10?emonth:'0'+emonth}-${eday>10?eday:'0'+eday}`
			break;
		case '3':
			end = starts.getTime() - 7 * 24 * 3600 * 1000
			newEnd = new Date(end)
			bmonth = starts.getMonth() + 1
			bday = starts.getDate()
			emonth = newEnd.getMonth() + 1
			eday = newEnd.getDate()
			obj['btime'] = `${starts.getFullYear()}-${bmonth>10?bmonth:'0'+bmonth}-${bday>10?bday:'0'+bday}`
			obj['etime'] = `${newEnd.getFullYear()}-${emonth>10?emonth:'0'+emonth}-${eday>10?eday:'0'+eday}`
			break;
		case '4':
			if (num === 365) {
				end = starts.getTime() - 182 * 24 * 3600 * 1000
			} else {
				end = starts.getTime() - 183 * 24 * 3600 * 1000
			}
			newEnd = new Date(end)
			bmonth = starts.getMonth() + 1
			bday = starts.getDate()
			emonth = newEnd.getMonth() + 1
			eday = newEnd.getDate()
			obj['btime'] = `${starts.getFullYear()}-${bmonth>10?bmonth:'0'+bmonth}-${bday>10?bday:'0'+bday}`
			obj['etime'] = `${newEnd.getFullYear()}-${emonth>10?emonth:'0'+emonth}-${eday>10?eday:'0'+eday}`
			break;
		case '5':
			if (num === 365) {
				end = starts.getTime() - 365 * 24 * 3600 * 1000
			} else {
				end = starts.getTime() - 366 * 24 * 3600 * 1000
			}
			newEnd = new Date(end)
			bmonth = starts.getMonth() + 1
			bday = starts.getDate()
			emonth = newEnd.getMonth() + 1
			eday = newEnd.getDate()
			obj['btime'] = `${starts.getFullYear()}-${bmonth>10?bmonth:'0'+bmonth}-${bday>10?bday:'0'+bday}`
			obj['etime'] = `${newEnd.getFullYear()}-${emonth>10?emonth:'0'+emonth}-${eday>10?eday:'0'+eday}`
			break;
		default:
			obj['btime'] = `${starts.getFullYear()}/${starts.getMonth()+1}/1`
			obj['etime'] = `${starts.getFullYear()}/${starts.getMonth()+1}/${starts.getDate()}`
	}
	return obj
}

export const combinationSum = (candidates, target) => {
	const buffer = [];
	const result = [];

	const backTrace = (index, target) => {
		if (target == 0) {
			return result.push(buffer.slice());
		}

		if (target < 0) {
			return;
		}

		if (index === candidates.length) return;

		buffer.push(candidates[index]);
		backTrace(index + 1, target - candidates[index]);
		buffer.pop();

		backTrace(index + 1, target);
	}
	backTrace(0, target);

	return [...new Set(result.map(arr => arr.sort((a, b) => a - b)).map(arr => arr.join('|')))].map(item => item.split(
		'|').map(num => +num));
};
// console.log(combinationSum2([1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096], 2433))
