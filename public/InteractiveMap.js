// Read imageLookupTableJson
var imageLookupTableJson = $('#imageLookupTableJson').text();
var imageLookupTable = JSON.parse(imageLookupTableJson);
var years = Object.keys(imageLookupTable);

// Initialize
var mapImg = $('#map');
mapImg.attr('src', imageLookupTable['-2100']);
mapImg.attr('data-magnify-src', imageLookupTable['-2100']);
console.log('Outputting: ' + imageLookupTable['-2100']);

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
            value: -2100,
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
    $("#amount").text('公元：-2100 (点击图片放大观看)');
});

function updateMap() {
    // console.log(ui.value)
    var slideBar = $('#slider-bar');
    var slideBarValue = slideBar.slider("value");

    // Round value
    var resultArray = [];
    var maxDistance = 4017;
    for (var i = 0; i < years.length; i++) {
        var pureYear = years[i]
            .replace('春', '')
            .replace('夏', '')
            .replace('秋', '')
            .replace('冬', '')
            .replace('月末', '');
        var yearNum = parseInt(pureYear);
        if (Math.abs(slideBarValue - yearNum) < maxDistance) {
            maxDistance = Math.abs(slideBarValue - yearNum);
            resultArray = [];
            resultArray.push(years[i]);
        } else if (Math.abs(slideBarValue - yearNum) === maxDistance) {
            resultArray.push(years[i]);
        }
    }

    // Chose graph
    var graphName = resultArray[0]; // TODO: Determine real graph
    var graphFile = imageLookupTable[graphName];
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