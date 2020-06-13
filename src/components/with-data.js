import React from 'react';

const WithData = (WrappedComponent, dataSource) => {
  class WithData extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        data: [],
      };
    }

    componentDidMount() {
      setTimeout(() => {
        fetch(this.props.dataSource)
          .then((response) => response.json())
          .then((data) => this.setState({ data: data.slice(0, 5) }));
      }, 1500);
    }

    render() {
      // separate out dataSource since it's not needed to pass down to WrappedComponent
      const { dataSource, ...otherProps } = this.props;

      return this.state.data.length < 1 ? (
        <h1>LOADING...</h1>
      ) : (
        <WrappedComponent data={this.state.data} {...otherProps} />
      );
    }
  }

  return WithData;
};

export default WithData;
