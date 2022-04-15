// Homework 1 Bohdan Mykhailiv

const reverseStringSplit = (str) => {
    return str.split('').reverse().join('');
}

const reverseStringArrayFrom = (str) => {
    return Array.from(str).reverse().join('');
}

const reverseStringSpreadOperator = (str) => {
    return [... str].reverse().join('');
}

const reverseStringNegativeFor = (str) => {
    let reversedString = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversedString += str[i];
    }
    return reversedString;
}

const reverseStringStringArrayIteration = (str) => {
    const stringArray = str.split('');
    const reversedStringArray = [];
    for (let i = stringArray.length - 1; i >= 0; i--) {
        reversedStringArray.push(stringArray[i]);
    }
    return reversedStringArray.join('');
}

const reverseStringReduce = (str) => {
    let reversedString = str.split('').reverse().reduce((prevValue, currentValue) => (
        prevValue + currentValue), '');
    return reversedString;
}

const reverseStringRightReduce = (str) => {
    let reversedString = str.split('').reduceRight((prevValue, currentValue) => (
        prevValue + currentValue), '');
    return reversedString;
}

const reverseStringConcat = (str) => {
    let reversedStringArray = [];
    for (let i = str.length - 1; i >= 0; i--) {
        reversedStringArray = reversedStringArray.concat([str[i]]);
    }
    return reversedStringArray.join('');
}

const reverseStringSubstring = (str) => {
    let reversedString = '';
    for (let i = str.length; i > 0; i--) {
        reversedString += str.substring(i - 1, i);
    }
    return reversedString;
}

const reverseStringPop = (str) => {
    const stringArray = [...str];
    let reversedString = '';
    while (stringArray.length > 0) {
        reversedString += stringArray.pop();
    }
    return reversedString;
}

const reverseStringChatAt = (str) => {
    let reversedString = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversedString += str.charAt(i);
    }
    return reversedString;
}


const inputString = '123456789'
console.log(reverseStringSplit(inputString));
console.log(reverseStringArrayFrom(inputString));
console.log(reverseStringNegativeFor(inputString));
console.log(reverseStringStringArrayIteration(inputString));
console.log(reverseStringReduce(inputString));
console.log(reverseStringSpreadOperator(inputString));
console.log(reverseStringRightReduce(inputString))
console.log(reverseStringConcat(inputString));
console.log(reverseStringSubstring(inputString));
console.log(reverseStringPop(inputString))
console.log(reverseStringChatAt(inputString));
