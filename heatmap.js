import { FloorpriceBatchedRequest, RestClient } from "@hellomoon/api";
import * as d3 from "d3";


const client = new RestClient("7f5a84f7-990c-41a0-81d1-e62a32a50fe9");

client.send(new FloorpriceBatchedRequest({
    helloMoonCollectionId: [
        "J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w4", // MadLads

    ],
    granularity: "ONE_DAY",
    limit: 100
})).then
    const data = response.data;

    // format data into heatmap
    const formattedData = [];
    for (let i = 0; i < data.length; i++) {
        const floorPrice = data[i].floorPrice;
        const volume = data[i].volume;
        const timestamp = data[i].timestamp;
        const date = new Date(timestamp * 1000);
        const dateString = date.toISOString().substring(0, 10);
        formattedData.push({
            date: dateString,
            floorPrice: floorPrice,
            volume: volume
        });
    }

    // set up chart
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .range([height, 0]);

    const color = d3.scaleSequential(d3.interpolateRdYlBu);

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // set domain for x, y, and color scales
    x.domain(formattedData.map(d => d.date));
    y.domain([0, d3.max(formattedData, d => d.floorPrice)]);
    color.domain([d3.min(formattedData, d => d.volume), d3.max(formattedData, d => d.volume)]);

    // create heatmap rectangles
    svg.selectAll(".tile")
        .data(formattedData)
        .enter()
        .append("rect")
        .attr("class", "tile")
        .attr("x", d => x(d.date))
        .attr("y", d => y(d.floorPrice))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.floorPrice))
        .style("fill", d => color(d.volume));

    // add x axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
