import React from 'react';
import Layout from './layout.jsx';

class Component extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    message: React.PropTypes.string,
    link: React.PropTypes.string
  }
  static defaultProps = {
    title: '',
    message: '',
    link: ''
  }
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <Layout title={this.props.title}>
          <p>{this.props.title}</p>
          <a href={this.props.link}>{this.props.message}</a>
        </Layout>
      </div>
    )
  }
}
export default Component
