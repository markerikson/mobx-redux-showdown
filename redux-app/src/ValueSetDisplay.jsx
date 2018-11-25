import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchValueSet } from './redux/actions/actions'

import {selectValueSetById} from "./redux/selectors/valueSetSelectors";

/** show the display of a value set code */
class ValueSetDisplay extends React.Component {

    static propTypes = {
        valueSet: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
    }

    componentDidMount() {
        this.props.load(this.props.valueSet)
    }

    render () {

        if (this.props.isLoading) {
            return <div>Loading...</div>
        }

        if (this.props.error) {
            return <div>Error: {this.props.error}</div>
        }

        return (
            <div>Display for <b>{this.props.code}</b> is:
                <b>{this.props.valueSetDisplay || '-'}</b>
            </div>
        )
    }
}

const mapState = (state, props) => {
    const valueSetEntry = selectValueSetById(state, props) || {};
    const {isLoading, error, valueSet = {}} = valueSetEntry;
    const valueSetDisplay = valueSet[props.code];
    return {isLoading, error, valueSetDisplay}
}

const actionCreators = {load : fetchValueSet};

export default connect(mapState, actionCreators)(ValueSetDisplay)
