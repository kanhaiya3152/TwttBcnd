const helper = () => {
    const num = Math.floor(Math.random() * 10);
    return num % 2 == 0;
}

const execute = () => {
    const result = helper();
    if(result) {
        return "Learning JS";
    } else {
        return "Learning React JS"
    }
}

export default {
    execute,
    helper
}