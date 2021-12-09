const numbers = [
{ "digit": "1", "id": "one" },
{ "digit": "2", "id": "two" },
{ "digit": "3", "id": "three" },
{ "digit": "4", "id": "four" },
{ "digit": "5", "id": "five" },
{ "digit": "6", "id": "six" },
{ "digit": "7", "id": "seven" },
{ "digit": "8", "id": "eight" },
{ "digit": "9", "id": "nine" },
{ "digit": "0", "id": "zero" },
{ "digit": ".", "id": "decimal" }];

const operators = [
{ "operator": "/", "id": "divide" },
{ "operator": "*", "id": "multiply" },
{ "operator": "-", "id": "subtract" },
{ "operator": "+", "id": "add" },
{ "operator": "=", "id": "equals" }];

const Calculator = () => {
  const [lastPressed, setLastPressed] = React.useState(undefined);
  const [calc, setCalc] = React.useState('0');
  const [operation, setOperation] = React.useState(undefined);

  const ops = ["/", "+", "*", "-"];
  const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const doCalculation = input => {
    switch (input) {
      case "=":
        const evaluated = eval(calc);
        setCalc(evaluated);
        break;

      case ".":
        const splitStr = calc.split(/[\+\-\/\*]/);
        const last = splitStr.slice(-1)[0];
        console.log(splitStr);
        if (!last.includes(".")) {
          setCalc(calc + ".");
        }
        break;

      default:
        let e = undefined;
        if (ops.includes(input)) {
          if (ops.includes(lastPressed) && input !== "-") {
            const lastNumberIndex = calc.split("").reverse().findIndex(char => char !== " " && nums.includes(char));
            e = calc.slice(0, calc.length - lastNumberIndex) + ` ${input} `;
          } else {
            e = calc + ` ${input} `;
          }} else
        {
          e = calc === '0' ? input : calc + input;
        }
        setCalc(e);
        setLastPressed(input);}

    setLastPressed(input);
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "calc" }, /*#__PURE__*/
    React.createElement("div", { id: "container display-div" }, /*#__PURE__*/

    React.createElement("div", null, /*#__PURE__*/
    React.createElement("input", { id: "display",
      className: "input",
      type: "text", value: calc,
      placeholder: "0",
      disabled: true })), /*#__PURE__*/


    React.createElement("button", { id: "clear",
      className: "btn btn-danger btn-clear",
      onClick: () => {setCalc("0");
        setOperation(undefined);} }, "AC"), /*#__PURE__*/


    React.createElement("div", { className: "seps" }, /*#__PURE__*/

    React.createElement("div", { className: "nums" },
    numbers.map(item => {
      return /*#__PURE__*/React.createElement(GetNumber, { key: item.id,
        item: item,
        doCalculation: doCalculation });
    })), /*#__PURE__*/



    React.createElement("div", { className: "ops" },
    operators.map(operation => {
      return /*#__PURE__*/React.createElement(GetOperator, { key: operation.id,
        operation: operation,
        doCalculation: doCalculation });
    }))))));





};
const GetNumber = ({ item, doCalculation }) => {
  return /*#__PURE__*/(

    React.createElement("div", null, /*#__PURE__*/
    React.createElement("button", { id: item.id,
      className: "btn btn-primary btn-layout",
      onClick: () => doCalculation(item.digit) },
    item.digit)));



};
const GetOperator = ({ operation, doCalculation }) => {
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("button", { id: operation.id, className: "btn btn-danger btn-layout", onClick: () => doCalculation(operation.operator) }, operation.operator)));


};
ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.querySelector("#app"));