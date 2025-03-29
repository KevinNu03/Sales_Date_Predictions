document.getElementById("generateButton").addEventListener("click", () => {
    const inputData = document.getElementById("dataInput").value;
    
    // Validamos y convertimos los datos
    const parsedData = validateAndParseInput(inputData);

    if (!parsedData.length) {
        alert("⚠ Por favor, ingresa números válidos separados por comas.");
        return;
    }

    // Dibujar el gráfico con los datos validados
    drawBarChart(parsedData);
});

/**
 * Valida y convierte la entrada de texto en un array de números.
 * @param {string} input - Cadena de texto con números separados por coma.
 * @returns {number[]} - Array de números validados.
 */
function validateAndParseInput(input) {
    return input
        .split(",")                   // Dividimos por comas
        .map(d => d.trim())           // Eliminamos espacios en blanco
        .filter(d => d !== "")        // Filtramos valores vacíos
        .map(Number)                  // Convertimos a número
        .filter(d => !isNaN(d) && d >= 0);  // Filtramos NaN y negativos
}

/**
 * Dibuja un gráfico de barras horizontales en el SVG.
 * @param {number[]} data - Array de números a representar en el gráfico.
 */
function drawBarChart(data) {
    const svg = d3.select("svg");
    svg.selectAll("*").remove(); // Limpiar gráfico previo

    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const barHeight = height / data.length;

    // Escala para el ancho de las barras
    const xScale = d3.scaleLinear()
                     .domain([0, d3.max(data)])
                     .range([0, width]);

    // Paleta de colores alternos (máximo 5)
    const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a8", "#ffdb33"];

    // Dibujar las barras
    svg.selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr("x", 0)
       .attr("y", (d, i) => i * barHeight)
       .attr("width", d => xScale(d))
       .attr("height", barHeight - 5)
       .attr("fill", (d, i) => colors[i % colors.length]); // Alternamos colores

    // Agregar etiquetas con valores dentro de las barras
    svg.selectAll("text")
       .data(data)
       .enter()
       .append("text")
       .attr("x", d => xScale(d) - 10)
       .attr("y", (d, i) => i * barHeight + barHeight / 2)
       .attr("dy", "0.35em")
       .attr("fill", "white")
       .attr("font-size", "14px")
       .attr("text-anchor", "end")
       .text(d => d);
}
