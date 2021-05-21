import React, { Component } from "react";

const setInitialState = (settings) => {
  const {
    itemHeight,
    amount,
    tolerance,
    minIndex,
    maxIndex,
    startIndex,
  } = settings;
  const viewportHeight = amount * itemHeight;
  const totalHeight = (maxIndex - minIndex + 1) * itemHeight;
  const toleranceHeight = tolerance * itemHeight;
  const bufferHeight = viewportHeight + 2 * toleranceHeight;
  const bufferedItems = amount + 2 * tolerance;
  const itemsAbove = startIndex - tolerance - minIndex;
  const topPaddingHeight = itemsAbove * itemHeight;
  const bottomPaddingHeight = totalHeight - topPaddingHeight;
  const initialPosition = topPaddingHeight + toleranceHeight;
  return {
    settings,
    viewportHeight,
    totalHeight,
    toleranceHeight,
    bufferHeight,
    bufferedItems,
    topPaddingHeight,
    bottomPaddingHeight,
    initialPosition,
    data: [],
  };
};

class VirtualScroll extends Component {
  constructor(props) {
    super(props);
    this.state = setInitialState(props.settings);
    this.viewportElement = React.createRef();
  }

  componentDidMount() {
    this.viewportElement.current.scrollTop = this.state.initialPosition;
    if (!this.state.initialPosition) {
      this.runScroller({ target: { scrollTop: 0 } });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.length !== this.props.data.length) {
      this.viewportElement.current.scrollTop = this.state.initialPosition;
      this.runScroller({ target: { scrollTop: 0 } });
    }
  }

  getData = (offset, limit) => {
    const { settings, data } = this.props;
    const buffer = [];
    const start = Math.max(settings.minIndex, offset);
    const end = Math.min(offset + limit - 1, settings.maxIndex - 1);
    // console.log(
    //   `request [${offset}..${offset + limit - 1}] -> [${start}..${end}] items`
    // );
    if (start <= end) {
      for (let i = start; i <= end; i++) {
        buffer.push(data[i]);
      }
    }
    return buffer;
  };

  runScroller = ({ target: { scrollTop } }) => {
    const {
      totalHeight,
      toleranceHeight,
      bufferedItems,
      settings: { itemHeight, minIndex },
    } = this.state;
    const index =
      minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight);
    const data = this.getData(index, bufferedItems);
    const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0);
    const bottomPaddingHeight = Math.max(
      totalHeight - topPaddingHeight - data.length * itemHeight,
      0
    );

    this.setState({
      topPaddingHeight,
      bottomPaddingHeight,
      data,
    });
  };

  render() {
    const {
      viewportHeight,
      topPaddingHeight,
      bottomPaddingHeight,
      data,
    } = this.state;
    return (
      <div
        className="viewport"
        ref={this.viewportElement}
        onScroll={this.runScroller}
        style={{ height: viewportHeight }}
      >
        <div style={{ height: topPaddingHeight }} />
        {data.map((item) => this.props.row(item, this.props.rowProps))}
        <div style={{ height: bottomPaddingHeight }} />
      </div>
    );
  }
}

export default VirtualScroll;
