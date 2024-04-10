
const px2rem = (v) => {
    const rem = 0.0625 * v;
    console.log(`${v}px => ${rem}rem`);
    return rem;
};

const rem2px = (v) => {
    const px = 16 * v;
    console.log(`${v}rem => ${px}px`);
    return px;
};

const convertPx2Rem = (input) => {

    // 정규 표현식을 사용하여 "px" 앞에 있는 숫자를 추출
    const REG_EX = /(\d*\.?\d+)\s*px/g;

    const result = input.replace(REG_EX, (match, pxValue) => {
        const remValue = px2rem(parseFloat(pxValue));
        return remValue + ((remValue !== 0) ? 'rem' : '');
    });

    const REG_EX_2 = /@media screen.*?(\d+(\.\d+)?)rem/g;
    const output2 = result.replace(REG_EX_2, (match, remValue) => {
        const pxValue  = rem2px(parseFloat(remValue));
        return match.replace(remValue, pxValue + 'px').replace('pxrem', 'px');
    });

    return output2;
};

const convertRem2Px = (input) => {

    const REG_EX = /(\d*\.?\d+)\s*rem/g;

    const result = input.replace(REG_EX, (match, pxValue) => {
        const remValue = rem2px(parseFloat(pxValue));
        return remValue + 'px';
    });

    return result;
};

const getDateTimeString = () => {

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}-${hours}${minutes}${seconds}`;
};

const main = (filePath) => {

    const fs = require('fs');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(data);
        const result = convertPx2Rem(data);
        //const result = convertRem2Px(data);
        console.log(result);

        if (data !== result) {
            const backupFilePath = filePath.replace('.css', `-backup-${getDateTimeString()}.css`);
            fs.copyFile(filePath, backupFilePath, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }

                fs.writeFile(filePath, result, 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            });
        } else {
            console.info("변경된 내용이 없습니다.");
        }

    });

};

const filePath = '../css/style-s3.css';
//const filePath = '../css/style.css';

main(filePath);
