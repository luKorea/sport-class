import axios from "../../utils/axios";

export const getReceiptList = params => {
    return axios({
        url: '',
        method: 'POST',
        data: params
    })
}