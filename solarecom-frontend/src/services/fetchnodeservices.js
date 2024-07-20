import axios from "axios";
var serverurl = "http://192.168.29.247:5000"
const postData = async (url, body) => {

    try {
        var response = await axios.post(`${serverurl}/${url}`, body)
        var result = response.data

        // console.log("bhai backend call hua hai ",response)
        return result

    }
    catch (e) {
        console.log("error bhai kya aa rha hai", e)
        return null;

    }

}


const getData = async (url) => {

    try {
        var response = await axios.get(`${serverurl}/${url}`)
        var result = response.data
        // console.log("fetch side",result)
        return result
    }
    catch (e) {
        return null;
    }

}


export { serverurl, postData, getData }