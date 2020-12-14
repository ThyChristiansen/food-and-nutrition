import React, { Component } from "react";
import "./calculator.css";

class Calculator extends Component {
  state = {
    firstNumber: "",
    secondNumber: "",
    operator: "",
    result: 0,
    isOperatorChosen: false,
    isCalculated: false,
    calculationList: [],
  };
  // componentDidMount() {
  //     //Get calculations when page have been load
  //     this.getCalculationList();
  // }
  //Get calculation list
  // getCalculationList() {
  //     axios.get("/api/all").then(res =>
  //         this.setState({
  //             calculationList: res.data
  //         })
  //     )
  //         .catch(err => console.log(err));

  // }
  //Handle number clicked
  handleNumberClick(event) {
    // Check if we've already run a calculation, if so we'll just exist.
    if (this.state.isCalculated) {
      return false;
    }

    //set result to string after user clicked the firstNumber
    this.setState({
      result: "",
    });

    //If the operator have been click (this.state.isOperatorChosen = true) then we should be writing the secondNumber
    if (this.state.isOperatorChosen) {
      this.setState({
        secondNumber: this.state.secondNumber + event.target.innerText,
      });
    } else {
      this.setState({
        firstNumber: this.state.firstNumber + event.target.innerText,
      });
    }
    console.log(this.state.firstNumber);
  }
  //Handle operator clicked
  handleOperatorClick(event) {
    //Check if a first number has already been selected. Or we've already run a calculation, if so we just exit.
    if (!this.state.firstNumber || this.state.isCalculated) {
      return false;
    }
    this.setState({
      operator: event.target.innerText,
      isOperatorChosen: true,
    });
  }
  //Handle equal clicked
  handleEqualClick() {
    let result;
    //Set this.state.firstNumber and this.state.secondNumber to the number
    let firstNumbers = parseInt(this.state.firstNumber);
    let secondNumbers = parseInt(this.state.secondNumber);
    if (this.state.operator === "+") {
      result = firstNumbers + secondNumbers;
    } else if (this.state.operator === "-") {
      result = firstNumbers - secondNumbers;
    } else if (this.state.operator === "x") {
      result = firstNumbers * secondNumbers;
    } else if (this.state.operator === ":") {
      result = firstNumbers / secondNumbers;
    }
    this.setState({
      isCalculated: true,
      result: result,
      calculationList: [
        ...this.state.calculationList,
        {
          first_number: firstNumbers,
          second_number: secondNumbers,
          operator: this.state.operator,
          result: result,
        },
      ],
    });
    // If we already clicked equal, don't do the calculation again
    if (this.state.isCalculated) {
      return false;
    }
  }

  handleClearClick() {
    this.setState({
      firstNumber: "",
      secondNumber: "",
      operator: "",
      result: 0,
      isOperatorChosen: false,
      isCalculated: false,
    });
  }

  render() {
    return (
      <div className="container">
            <div className="calculator">
              <div className="card-body display-calculation">
                <div className="text_content">
                  <span id="first-number">{this.state.firstNumber}</span>
                  <span id="ospanerator">{this.state.operator}</span>
                  <span id="second-number">{this.state.secondNumber}</span>
                  {this.state.isCalculated === true ? (
                    <span>=</span>
                  ) : (
                    <span></span>
                  )}
                  <span>{this.state.result}</span>
                </div>
              </div>
              <div className="card-body calculator_body">
                <button
                  className="button number"
                  onClick={(value) => this.handleNumberClick(value)}
                >
                  1
                </button>
                <button
                  className="button number"
                  onClick={(value) => this.handleNumberClick(value)}
                >
                  2
                </button>
                <button
                  className="button number"
                  onClick={(value) => this.handleNumberClick(value)}
                >
                  3
                </button>
                <button
                  className="button operate"
                  onClick={(value) => this.handleOperatorClick(value)}
                >
                  +
                </button>
                <br />
                <button
                  className="button number"
                  onClick={(value) => this.handleNumberClick(value)}
                >
                  4
                </button>
                <button
                  className="button number"
                  onClick={(value) => this.handleNumberClick(value)}
                >
                  5
                </button>
                <button
                  className="button number"
                  onClick={(value) => this.handleNumberClick(value)}
                >
                  6
                </button>
                <button
                  className="button operate"
                  onClick={(value) => this.handleOperatorClick(value)}
                >
                  -
                </button>
                <br />
                <button
                  className="button number"
                  onClick={(value) => this.handleNumberClick(value)}
                >
                  7
                </button>
                <button
                  className="button number"
                  onClick={(value) => this.handleNumberClick(value)}
                >
                  8
                </button>
                <button
                  className="button number"
                  onClick={(value) => this.handleNumberClick(value)}
                >
                  9
                </button>
                <button
                  className="button operate"
                  onClick={(value) => this.handleOperatorClick(value)}
                >
                  x
                </button>
                <br />
                <button
                  className="button number"
                  onClick={(value) => this.handleNumberClick(value)}
                >
                  0
                </button>
                <button
                  className="button operate"
                  onClick={(value) => this.handleOperatorClick(value)}
                >
                  :
                </button>
                <button
                  className="button operate c-btn"
                  onClick={(value) => this.handleClearClick(value)}
                >
                  C
                </button>
                <button
                  className="button operate equa-btn"
                  onClick={(value) => this.handleEqualClick(value)}
                >
                  =
                </button>
              </div>
            </div>
      </div>
    );
  }
}
export default Calculator;
