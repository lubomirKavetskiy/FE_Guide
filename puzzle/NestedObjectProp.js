const obj = {a: {b:2, c: {d:2}}};

const hasKeyDeep = (str, obj) => {
    const keys = str.split('.');

    return keys.every((k) => {
        if(typeof obj !=='object' || obj === null || !(k in obj)) return false;

        obj = obj[k];
        return true;
    });
};

console.log(hasKeyDeep('a.c.d', obj));//true;
console.log(hasKeyDeep('a.b.c', obj));//false;


const propDeep = (str, obj) => {
    const keys = str.split('.');

    return keys.reduce((acc, curr) => {
        if(typeof acc !== 'object' || !(curr in acc)) return undefined;
        return acc[curr];
    }, obj);
};

console.log(propDeep('a.d', obj));
