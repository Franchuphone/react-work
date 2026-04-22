import { Component } from "react"

export default class Count extends Component {

    constructor( props ) {
        super( props );
    }

    render() {
        return (
                    <h4> {this.props.length} tasks pending </h4>
        )

    }
    
}