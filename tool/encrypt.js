import crypto from 'crypto'

function getEncrypt(str, dsKey) {
    const cipher = crypto.createCipheriv('des-ede3', new Buffer(dsKey), new Buffer(0));
    let encrypted = cipher.update(str, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

export default getEncrypt
