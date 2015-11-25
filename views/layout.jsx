import React from 'react';

class Component extends React.Component {
  constructor() {
    super();
  }
  static propTypes = {
    title: React.PropTypes.string,
    children: React.PropTypes.array
  };
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    )
  }
}

export default Component
