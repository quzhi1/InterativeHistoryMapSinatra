// Read imageLookupTableJson
const imageLookupTableJson = $('#imageLookupTableJson').text();
const imageLookupTable = JSON.parse(imageLookupTableJson);
const years = Object.keys(imageLookupTable);

// Initialize
const mapImg = $('#map');
let year = $("#year").text();
mapImg.attr('src', imageLookupTable[year]);
mapImg.attr('data-magnify-src', imageLookupTable[year]);
console.log('Outputting: ' + imageLookupTable[year]);

$(document).ready(function () {
    // Load map and magnifier
    mapImg
        .wrap('<span style="display:inline-block"></span>')
        .css('display', 'block')
        .parent()
        .zoom({
            on: 'click',
            magnify: 2
        });

    // Slide bar
    $(function () {
        var slideBar = $('#slider-bar');
        slideBar.slider({
            range: "max",
            min: -2100,
            max: 2030,
            value: parseInt(year),
            step: 0.5,
            change: function (event, ui) {
                updateMap();
            },
            slide: function (event, ui) {
                updateMap();
            }
        });
    });

    // Label
    $("#amount").text('公元：' + year + ' (点击图片放大观看)');
});

function updateMap() {
    // console.log(ui.value)
    const slideBar = $('#slider-bar');
    const slideBarValue = slideBar.slider("value");

    // Round value
    let resultArray = [];
    let maxDistance = 4017;
    for (let i = 0; i < years.length; i++) {
        let pureYear = years[i]
            .replace('春', '')
            .replace('夏', '')
            .replace('秋', '')
            .replace('冬', '')
            .replace('月末', '');
        let yearNum = parseInt(pureYear);
        if (Math.abs(slideBarValue - yearNum) < maxDistance) {
            maxDistance = Math.abs(slideBarValue - yearNum);
            resultArray = [];
            resultArray.push(years[i]);
        } else if (Math.abs(slideBarValue - yearNum) === maxDistance) {
            resultArray.push(years[i]);
        }
    }

    // Chose graph
    const graphName = resultArray[0]; // TODO: Determine real graph
    const graphFile = imageLookupTable[graphName];
    mapImg.attr('src', graphFile);
    // console.log('Rendering ' + graphFile)
    $("#amount").text('公元：' + graphName + ' (点击图片放大观看)');

    // Update magnifier
    mapImg.on('load', function () {
        mapImg
            .parent()
            .trigger('zoom.destroy')
            .zoom({
                on: 'click',
                magnify: 2
            });
    });
}

// function getParameterByName(name) {
//     const url = window.location.href;
//     name = name.replace(/[\[\]]/g, '\\$&');
//     const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, ' '));
// }