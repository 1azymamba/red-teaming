function encode_to_javascript(string) {
    var input = string
    var output = '';
    for (pos = 0; pos < input.length; pos++) {
      output += input.charCodeAt(pos);
      if (pos != (input.length - 1)) {
        output += ",";
      }
    }
    return output;
  }
  
let encoded = encode_to_javascript('input_string')
console.log(encoded)