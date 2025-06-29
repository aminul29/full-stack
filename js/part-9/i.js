
function add(a, b) {
    return a + b;    
}
function subtract(a, b) {
    return a - b;    
}
function multiply(a, b) {
    return a * b;    
}

// Exporting functions using commonjs syntax
module.exports = { add, subtract, multiply };