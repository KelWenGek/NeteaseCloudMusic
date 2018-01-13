import PropTypes from 'prop-types'
import axios from 'axios';
export function repeat(str, n) {
    let res = '';
    while (n) {
        if (n % 2 === 1) res += str;
        if (n > 1) str += str;
        n >>= 1;
    }
    return res
}

export function check4ten(number) {
    number = Number(number);
    if (number < 10) number = '0' + number;
    return String(number);
}

//获取数据
export function fetchData(options) {
    return new Promise(function (resolve, reject) {
        try {
            axios.request(options)
                .then(response => resolve(response.data));
        } catch (e) {
            reject(e);
        }
    });
}


export const storeShape = PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
})