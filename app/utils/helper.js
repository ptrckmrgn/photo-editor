const isPositiveInteger = value => {
    console.log(value);
    // const regex = new RegExp(/(?!0)(\d+)(?!.)/);
    const regex = new RegExp(/^[1-9][0-9]*/);
    console.log(regex.test(value));
    return regex.test(value);
}

const isZero = value => {
    return value === '' || value === '0';
}

export default {
    isPositiveInteger, 
    isZero
};