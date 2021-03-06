import React from "react";
import {connect} from "react-redux";
import {setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate} from "../actions/filters";
import {DateRangePicker} from "react-dates";

class ExpenseListFilter extends React.Component {
    state = {
        calendarFocused: null
    }

    onDatesChange = ({startDate, endDate}) => {
        console.log(startDate)
        this.props.dispatch(setStartDate(startDate))
        this.props.dispatch(setEndDate(endDate))

    }
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({
            calendarFocused
        }));
    }

    render() {
        return (
            <div>
                <input type="text"
                       placeholder="Filter text"
                       value={this.props.filters.text}
                       onChange={(e) => {
                           this.props.dispatch(setTextFilter(e.target.value))
                       }}/>

                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <select id="sortBy"
                        value={this.props.filters.sortBy}
                        onChange={(e) => {
                            if (e.target.value === "amount") {
                                this.props.dispatch(sortByAmount())
                            } else {
                                this.props.dispatch(sortByDate())
                            }
                        }}>
                    <option value="amount">Amount</option>
                    <option value="date">Date</option>
                </select>
            </div>

        )
    }
}

const mapStateToProp = (state) => ({
    filters: state.filters
})

export default connect(mapStateToProp)(ExpenseListFilter);