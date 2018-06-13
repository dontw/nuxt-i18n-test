export default {
    filters: {
        //val 0:woman 1:man
        genderToLetter(val) {
            switch (val) {
                case 0:
                    return '女'
                case 1:
                    return '男'
                default:
                    return '无'
            }
        },
        roleToLetter(val) {
            switch (val) {
                case 0:
                    return '管理员'
                case 1:
                    return '一般用户'
                case 2:
                    return '厂商'
                default:
                    return '无'
            }
        },
        bindToLetter(val) {
            switch (val) {
                case false:
                    return '未绑定'
                case true:
                    return '已绑定'
                default:
                    return '无'
            }
        },

        firmStatus(val) {
            switch (val) {
                case 1:
                    return '审核成功'
                case 2:
                    return '审核失败'
                case 3:
                    return '审核中'
                default:
                    return '无'
            }
        }
    }
}
