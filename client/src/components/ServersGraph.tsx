import * as React from "react";
import * as d3 from 'd3';

export interface ServersGraphProps { title: string
}

export class ServersGraph extends React.Component<ServersGraphProps, undefined> {

    componentDidMount() {
        // set the dimensions and margins of the graph
        let margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

// parse the date / time
        let parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
        let x = d3.scaleTime().range([0, width]);
        let y = d3.scaleLinear().range([height, 0]);

// define the line
        let valueline = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.close);
            });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
        let svg = d3.select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        const data = [
            {
                date: '1-May-12',
                close: '58.13'
            },
            {
                date: '30-Apr-12',
                close: '53.98'
            },
            {
                date: '27-Apr-12',
                close: '67.00'
            },
            {
                date: '26-Apr-12',
                close: '89.70'
            },
            {
                date: '25-Apr-12',
                close: '99.00'
            }
        ];

        // format the data
        data.forEach(function (d) {
            d.date = parseTime(d.date);
            d.close = +d.close;
        });


        console.log(data);

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.close;
        })]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

    }

    render() {
        return <div className="shadow--xs rows bg--content margin-b--lg">
            <div className="minor padding--md bg--primary">{this.props.title}</div>
            <div className="padding--xl">
                <svg width="960" height="500"></svg>
            </div>
        </div>;
    }
}