class StringBuilder {
  constructor(baseString = "") {
    this.value = baseString;
  }

  append(str) {
    let formattedStr = String(str);
    this.value += formattedStr;
    return this;
  }

  prepend(str) {
    let formattedStr = String(str);
    this.value = formattedStr + this.value;
    return this;
  }

  pad(str) {
    let formattedStr = String(str);
    this.value = formattedStr + this.value + formattedStr;
    return this;
  }
}

const builder = new StringBuilder(".");

builder.append("^").prepend("^").pad("=");

console.log(builder.value);
