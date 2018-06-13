export default {
    methods: {
        /**
         * 将错误代码转为错误信息
         * @param {Sring} errCode - 错误代码
         * @return {String} - 错误信息
         */
        errCodeMsg(errCode) {
            switch (errCode) {
                case '01.003':
                    return `凭证过期`
                case '01.006':
                    return `密码错误`
                case '02.001':
                    return `账号错误`
                default:
                    return `其他的错误，请联系开发人员(错误代码：${errCode})`
            }
        }
    }
}
