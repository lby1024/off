
const fns = {
    // 获取当前时间
    get_date () {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()+1
        let day = date.getDate()
        let hours = date.getHours()
        let min = date.getMinutes()+1
        let s =date.getSeconds()+1
        let t = `${year}年${month}月${day}日 ${hours} : ${min} : ${s}`
        return t
    },
    // 毫秒 ---变---> 年月日
    get_time (data) {
        let time = new Date(data)
        let year = time.getFullYear()
        let month = time.getMonth()+1
        let day = time.getDate()
        let hours = time.getHours()
        let min = time.getMinutes()+1
        let s =time.getSeconds()+1
        let t = `${year}-${month}-${day}   ${hours} : ${min} : ${s}`
        return t
    },
    // 总共的时间长度 ms ---> 时分秒
    get_h_m_s (_s) {
        let h = Math.floor(_s/60/60)
        let m = Math.floor(_s/60 - h*60)
        let s = _s - h*60*60 -m*60
        return `${h}小时${m}分钟${s}秒`
    }
}
export default fns