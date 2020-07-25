const $div = $("<div>");
const $accordian = $("#dyn-form");
let userData = {};

// onload, make an api call to /api/user_data that will return a json object with their email and id. store this as a global object. then call getFlights()
$(document).ready(async function () {
    await $.ajax({
        method: "GET",
        url: "/api/user_data"
    })
        .then(result => {
            userData = result;
            console.log(userData)
        })
        .catch(err => console.error(err));

    await getFlights(userData.id);
});

$("#create-flight").on("click", function (e) {
    e.preventDefault();
    $accordian.empty();
    createFlight();
});


$('#create-aircraft').on('click', function (e) {
    e.preventDefault();
    $accordian.empty();
    createAircraft();
})


function createInputLoop(arr1, arr2) {
    $accordian.append('<p>', arr2[0])
    for (let i = 1; i < arr1.length; i++) {
        const $input = $('<input class=form-control>');
        const $label = $("<label>");
        $input.attr('id', arr1[i]);
        $input.attr('placeholder', arr1[0]);
        $input.addClass(arr2[1]);
        $label.text(arr2[i + 1]);
        $accordian.append($label, $input);
    };
};

function createInputLoopCheckboxes(arr1, arr2) {
    $accordian.append('<p>', arr2[0])
    for (let i = 1; i < arr1.length; i++) {
        const $input = $('<input type=check-box>');
        const $label = $("<label>");
        $input.attr('id', arr1[i]);
        $input.addClass(arr2[1]);
        $label.text(arr2[i + 1]);
        // $div.addClass("input-group-prepend");
        // $div.append($input)
        $accordian.append($label, $input);
    };
};
// Used to make all of the input boxes for the create flight section
function createFlight() {
    //General Flight Info
    const generalFlight = ['', 'date', 'tailNumber', 'aircraftID', 'depAir', 'enrRout', 'arrAir', 'comments']
    const generalFlightInfo = ['General Flight Information', 'general', 'Date', 'Tail Number', 'Aircraft Type', 'Departure Airport', 'Enroute Airports', 'ArrivalAirports', 'Comments']
    createInputLoop(generalFlight, generalFlightInfo)

    // Landings and Approaches
    const approachLanding = [0, 'approach', 'holds', 'totalLandings', 'dayLdg', 'nightLdg']
    const approachLandingInfo = ['Aproaches and Landings', 'app', 'Approach', 'Holds', 'Total Landings', 'Day Landing', 'Night Landing']
    createInputLoop(approachLanding, approachLandingInfo)
    // Times
    const flightTimesIds = [0.00, 'total', 'cxt', 'night', 'hood', 'imc', 'dual', 'cfi', 'sic', 'pic']
    const flightTimesidsLabel = ['Flight Times', 'times', 'Total', 'Cross-Country', 'Night', 'Simulated Instrument', 'IMC', 'Dual (Instruction Recieved)', 'CFI (Instructor)', 'SIC (Second in Command)', 'PIC (Pilot in Command)']
    createInputLoop(flightTimesIds, flightTimesidsLabel)

    const newButton = $("<button>").attr('id', 'createFlightButton').text("Add Flight")
    $accordian.append(newButton)

    $("#createFlightButton").click(function (event) {
        event.preventDefault();
        writeFlightTime();
    })
};

function writeFlightTime() {
    const NULL = null
    $('.form-control').each(function () {
        console.log($(this).attr('class'))
        if ($(this).hasClass('general')) {
            const generalName = $(this).attr('id')
        }
        Error();
    });

    if ($("#imc").val().trim() == '') {
        imc = 0.00
    } else {
        imc = $("#imc").val().trim()
    };
    if ($("#hood").val().trim() == '') {
        hood = 0.00
    } else {
        hood = $("#hood").val().trim()
    };
    if ($("#holds").val().trim() == '') {
        holds = 0
    } else {
        holds = $("#holds").val().trim()
    };
    if ($("#pic").val().trim() == '') {
        pic = NULL
    } else {
        pic = $("#pic").val().trim()
    };
    if ($("#sic").val().trim() == '') {
        sic = 0.00
    } else {
        sic = $("#sic").val().trim()
    };
    if ($("#dual").val().trim() == '') {
        dual = 0.00
    } else {
        dual = $("#dual").val().trim()
    };
    if ($("#cfi").val().trim() == '') {
        cfi = 0.00
    } else {
        cfi = $("#cfi").val().trim()
    };
    if ($("#cxt").val().trim() == '') {
        cxt = 0.00
    } else {
        cxt = $("#cxt").val().trim()
    };
    if ($("#night").val().trim() == '') {
        night = 0.00
    } else {
        night = $("#night").val().trim()
    };
    if ($("#total").val().trim() == '') {
        total = 0.00
    } else {
        total = $("#total").val().trim()
    };
    if ($("#approach").val().trim() == '') {
        approach = 0.00
    } else {
        approach = $("#approach").val().trim()
    };
    if ($("#totalLandings").val().trim() == '') {
        totalLandings = 0.00
    } else {
        totalLandings = $("#totalLandings").val().trim()
    };
    if ($("#dayLdg").val().trim() == '') {
        dayLdg = 0.00
    } else {
        dayLdg = $("#dayLdg").val().trim()
    };
    if ($("#nightLdg").val().trim() == '') {
        nightLdg = 0.00
    } else {
        nightLdg = $("#nightLdg").val().trim()
    };
    $.post("/api/flight_time", {
        UserId: userData.id,

        date: $("#date").val(),
        tailNumber: $("#tailNumber").val().trim(),
        AircraftID: $("#aircraftID").val().trim(),
        depAir: $("#depAir").val().trim(),
        enrRout: $("#enrRout").val().trim(),
        arrAir: $("#arrAir").val().trim(),
        comments: $("#comments").val().trim(),
        approach: approach,
        holds: holds,
        totalLandings: totalLandings,
        dayLdg: dayLdg,
        nightLdg: nightLdg,
        total: total,
        cxt: cxt,
        night: night,
        hood: hood,
        imc: imc,
        dual: dual,
        cfi: cfi,
        sic: sic,
        pic: pic,
    })

        .then(function () {
            result =>
                console.log(result)
            // If there's an error, log the error
        })
        .catch(function (err) {
            console.log(err.responseJSON.parent)
        });

}

// function for input boxes for create aircraft section
function createAircraft() {

    const generalAircraft = ['', 'aircraftType', 'class', 'numEngine'];

    const generalAircraftLabels = ['General Aircraft Information', 'general', 'Aircraft Type', 'Class', 'Number of Engines'];

    createInputLoop(generalAircraft, generalAircraftLabels);

    const generalAircraftBoolean = ['', 'tailWheel', 'complex', 'highPerf', 'turboFan', 'turboProp', 'rototcraft', 'poweredLift'];

    const generalAircraftBooleanLabels = ['', 'general', 'Tail Wheel', 'Complex', 'High Perf', 'Turbo Fan', 'Turbo Prop', 'Rotocraft', 'Powered Lift'];

    createInputLoopCheckboxes(generalAircraftBoolean, generalAircraftBooleanLabels);

    const newButton = $("<button>").attr('id', 'create-aircraft-button').text("Add Aircraft")
    $accordian.append(newButton)

    $('#create-aircraft-button').on('click', function (e) {
        e.preventDefault();
        console.log("working");
        writeAircraft();
    })
};

// function for writing create aircraft fields to the db
function writeAircraft() {
    $('.form-control').each(function () {
        console.log($(this).attr('class'))
        if ($(this).hasClass('general')) {
            const generalName = $(this).attr('id')
        } else {
            Error();
        };
    });

    $.post("/api/aircraft", {
        userId: userData.id,
        aircraftType: $("#aircraftType").val(),
        class: $("#class").val(),
        numEngine: $("#numEngine").val(),
        tailWheel: $("#tailWheel").val(),
        complex: $("#complex").val(),
        highPerf: $("#highPerf").val(),
        turboFan: $("#turboFan").val(),
        turboProp: $("#turboProp").val(),
        rotocraft: $("#rotocraft").val(),
        poweredLift: $("#poweredLift").val()
    })
        .then(result => console.log(result))
        .catch(err => console.error(err.responseJSON.parent));

}
// function for getting all flights associated with the logged in user
function getFlights(userId) {
    $.ajax({
        method: "GET",
        url: `/api/flight_time/${userId}`
    })
        .then(async flights => await displayFlightTimeTable(flights))
        .catch(err => console.error(err));
};

// function for displaying all flight times in a table
function displayFlightTimeTable(flights) {
    console.log("flights: ", flights) // flights is an array of objects coming back from the db, where each object is 1 flighttime.

    // creates an array of names from flight_time table to use as table column names
    //doing this in html, but saving the code for potential future refactoring
    // let col = [];
    // for (let i = 0; i < flights.length; i++) {
    //     for (const key in flights[i]) {
    //         if (col.indexOf(key) === -1) {
    //             col.push(key);
    //         };
    //     };
    // };
    // console.log(col);

    // pushing the values from the flgihts object into an array
    // array to hold flight_time data
    let data = [];
    const $tbody = $("#body");
    let $tr;
    let $td;
    for (let i = 0; i < flights.length; i++) {
        // extract the values from flight_time and push them into data array in order to populate the table
        $th = $("<th>")
            .attr("scope", "row")
            .text([i + 1]);
        $tr = $("<tr>")
        for (const values in flights[i]) {
            // push all the flights data into the array, except for the Aircraft object
            // if (typeof flights[i][values] !== "object") {
            //     data.push(flights[i][values])
            //     // push the first 32 indeces of the array into a new array
            //     //
            // };
            // console.log("flights at i .id: ",flights[i].id)
            $td = $("<td>").text(flights[i][values]); //flights[i] {id:4, date:...}
            $tr.append($td)
        };

        let $button = $("<button>")
            .text("Edit")
            .attr('data-ft-id', flights[i].id);
        $tr.append($button);
        $tbody.append($th, $tr);

        // pushing the values from the aircraft object into an array
        let aircraftValues = []
        for (const values in data[32]) {
            // console.log("DATA32VALUES: ", data[32][values])
            aircraftValues.push(data[32][values])
        };
        // console.log(data[32].id)
        // console.log("Aircraft Values: ", aircraftValues)
    };
};