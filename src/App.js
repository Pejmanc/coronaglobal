import React from "react";

import { Cards, CountryPicker, Chart } from "./components";
import { fetchData } from "./api/";
import styles from "./App.module.css";
import image from "./images/image.png";
import Footer from "./components/Footer/Footer";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Cards data={data} />
        <Chart data={data} country={country} />
        <Footer />
      </div>
    );
  }
}

export default App;
