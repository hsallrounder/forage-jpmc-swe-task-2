import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  // Add a new property 'showGraph' of type 'boolean' to the IState interface in App.tsx
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      // In the constructor of the App component, initialize 'showGraph' as false to keep the graph hidden initially
      // The graph will be displayed when the user clicks 'Start Streaming Data'
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    // Update the 'renderGraph' method to include a condition that checks if 'showGraph' is true
    // The graph will only render when the 'showGraph' property in the App's state is true
    if (this.state.showGraph) {
      return (<Graph data={this.state.data} />)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   * Modify the 'getDataFromServer' method to continuously fetch data from the server using 'setInterval'
   * Use a guard value to stop the interval when necessary, allowing continuous data streaming until stopped
   * Ensure the method contacts the server at regular intervals to update the graph dynamically
   */
  getDataFromServer() {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // Update the state by creating a new array of data that consists of
        // Previous data in the state and the new data from server
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      x++;
      if (x > 1000) {
        clearInterval(interval);
      }
    }, 100);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => { this.getDataFromServer() }}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
