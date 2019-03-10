import React, { Component } from "react";
import Render from "./Render";
import { accessKeyApilayer, appIdOpenexchangerates } from "./accessKeys";

class FetchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetCyrrencies: ["AUD", "EUR", "NOK", "RUB"],
      apilayer: {},
      openexchangerates: {},
      floatrates: {}
    };
  }
  componentDidMount() {
    fetch("http://apilayer.net/api/live?access_key=" + accessKeyApilayer)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          apilayer: data.quotes
        });
      });

    fetch(
      "https://openexchangerates.org/api/latest.json?app_id=" +
        appIdOpenexchangerates
    )
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          openexchangerates: data.rates
        });
      });

    fetch("http://www.floatrates.com/daily/usd.xml")
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        let items = data.querySelectorAll("item");
        let currencies = {};
        for (let i = 0; i < items.length; i++) {
          let targetCurrency = items[i].querySelector("targetCurrency")
            .innerHTML;
          let exchangeRate = items[i].querySelector("exchangeRate").innerHTML;
          if (targetCurrency && exchangeRate) {
            currencies[targetCurrency] = +exchangeRate;
          }
        }
        this.setState({ floatrates: currencies });
      });
  }

  render() {
    return <Render state={this.state} />;
  }
}

export default FetchData;
