const crypto = require('crypto');


var getObjectKeys = function (obj) {
    var list = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            list.push(key);
        }
    }
    return list.sort();
};

function camSafeUrlEncode(str) {
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
}
var obj2str = function (obj) {
    var i, key, val;
    var list = [];
    var keyList = getObjectKeys(obj);
    for (i = 0; i < keyList.length; i++) {
        key = keyList[i];
        val = (obj[key] === undefined || obj[key] === null) ? '' : ('' + obj[key]);
        key = key.toLowerCase();
        key = camSafeUrlEncode(key);
        val = camSafeUrlEncode(val) || '';
        list.push(key + '=' + val)
    }
    return list.join('&');
};

exports.tenxunyun = (req, res) => {

    const secretID = 'AKIDb7ScfYqoDTaN1TP7EAtAPSO9k9NTwFtU';
    const secretKey = 'f9t7B3jHyibVGuQlz2vfHk285sTs5FDz';

    const method = req.body.method;
    const headers = req.body.headers;
    const path = req.body.path;
    const query = req.body.query;

    // 签名有效起止时间
    const now = parseInt(new Date().getTime() / 1000) - 1;
    const expired = now + 600; // 签名过期时刻，600 秒后

    // 要用到的 Authorization 参数列表
    const qSignAlgorithm = 'sha1';
    const qAk = secretID;
    const qKeyTime = qSignTime = now + ';' + expired;
    const qHeaderList = getObjectKeys(headers).join(';').toLowerCase();
    const qUrlParamList = getObjectKeys(query).join(';').toLowerCase();

    // 签名算法说明文档：https://www.qcloud.com/document/product/436/7778
    // 步骤一：计算 SignKey
    var signKey = crypto.createHmac('sha1', secretKey).update(qKeyTime).digest('hex');

    // 步骤二：构成 FormatString
    var formatString = [method.toLowerCase(), path, obj2str(query), obj2str(headers), ''].join('\n');

    // 步骤三：计算 StringToSign
    var stringToSign = ['sha1', qSignTime, crypto.createHash('sha1').update(formatString).digest('hex'), ''].join('\n');

    // 步骤四：计算 Signature
    var qSignature = crypto.createHmac('sha1', signKey).update(stringToSign).digest('hex');

    // 步骤五：构造 Authorization
    var authorization = [
        'q-sign-algorithm=' + qSignAlgorithm,
        'q-ak=' + qAk,
        'q-sign-time=' + qSignTime,
        'q-key-time=' + qKeyTime,
        'q-header-list=' + qHeaderList,
        'q-url-param-list=' + qUrlParamList,
        'q-signature=' + qSignature
    ].join('&');

    res.send({
        data: {
            authorization: authorization,
            bucket: 'zr-1253381776',
            region: 'ap-guangzhou'
        }
    });

}