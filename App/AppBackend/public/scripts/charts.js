document.addEventListener("DOMContentLoaded", function () {
    const graphContainer = document.getElementById("graph-container");
    const graphDataString = graphContainer.dataset.graphData;
    const graphData = JSON.parse(graphDataString);

    // Set up the SVG width and height
    const width = 400;
    const height = 300;

    // Create an SVG element and append it to the graph container
    const svg = d3.select("#graph-container")
        .append("svg")
        .attr("id", "chart")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);


    const flattenedData = [];
    graphData.forEach((restaurant) => {
        let restaurantavg = 0;
        let i = 0;
        restaurant.menus.forEach((menu) => {
            menu.items.forEach((item) => {
                const ratingInteger = parseInt(item.rating);
                if (!isNaN(ratingInteger)) {
                    restaurantavg += ratingInteger;
                    i += 1;
                }
            });
        });
        flattenedData.push({
            restaurantName: restaurant.restaurantName,
            rating: i > 0 ? restaurantavg / i : 0,
        });
    });

    // Sort the flattenedData array in decreasing order based on rating
    flattenedData.sort((a, b) => b.rating - a.rating);

    // Get the first 5 elements from the sorted array
    const topFive = flattenedData.slice(0, 5);



    console.log(topFive);
    // Set up the scales for the x and y axes
    const xScale = d3.scaleBand()
        .domain(topFive.map(d => d.restaurantName))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(topFive, d => d.rating)])
        .range([height, 0]);

    // Create the bars
    const bars = svg.selectAll("rect")
        .data(topFive)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.restaurantName))
        .attr("y", d => yScale(d.rating))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.rating))
        .attr("fill", "steelblue");

    // Add labels to the x-axis

    svg.append("g")
        .attr("transform", "translate(" + 0 + "," + (height + 2) + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .style("fill", "black")
        .attr("dy", "0.15em");

    // Add labels to the y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Add x-axis label
    svg.append("text")
        .attr("transform", `translate(${width / 2}, ${height + 30})`)
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("Restaurant");

    // Add y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -40)
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("Rating");

    // Add restaurant names below the bars
    svg.selectAll(".restaurant-name")
        .data(topFive)
        .enter()
        .append("text")
        .attr("class", "restaurant-name")
        .attr("x", d => xScale(d.restaurantName) + xScale.bandwidth() / 2)
        .attr("y", height + 20) // Adjust the y-coordinate to control the vertical position
        .attr("transform", "translate(0, 10)")
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text(d => d.restaurantName);


    // Add rating values on top of the bars
    svg.selectAll(".rating-value")
        .data(topFive)
        .enter()
        .append("text")
        .attr("class", "rating-value")
        .attr("x", d => xScale(d.restaurantName) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.rating) - 5)
        .style("text-anchor", "middle")
        .text(d => d.rating.toFixed(1));
});