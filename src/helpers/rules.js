const nameRules = () => {
    return [(v) => /([A-Za-z-0-9]){4,}/.test(v)];
};

const emailRules = () => {
    return [(v) => /.+@.+\..+/.test(v)];
};

const passwordRules = () => {
    return [(v) => /([A-Za-z-0-9.*-?&%$#+]){6,}/.test(v)];
};

const repeactRules = (v1, v2) => {
    return [v1 == v2];
};

const telRules = () => {
    return [(v) => v.length <= 16 && v.length >= 8];
};

const numbersRules = () => {
    return [(v) => /([0-9]){18,20}/.test(v)];
};

const numberAccount = () => {
    return [(v) => /([0-9]){4,25}/.test(v)];
};

const nullable = () => {
    return true;
};

export {
    nameRules,
    emailRules,
    passwordRules,
    repeactRules,
    telRules,
    numbersRules,
    numberAccount,
    nullable,
};