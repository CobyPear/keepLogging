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
    // if ($(".collapse show")) {
    //     e.stopPropagation();
    // }
    $accordian.empty();
    createFlight();
});


$('#create-aircraft').on('click', function (e) {
    e.preventDefault();
    // if ($(".collapse show")) {
    //     e.stopPropagation();
    // }
    $accordian.empty();
    createAircraft();
});


function createInputLoop(arr1, arr2) {
    $accordian.append(arr2[0], '<hr>')
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
    $accordian.append(arr2[0], '<hr>')
    for (let i = 1; i < arr1.length; i++) {
        const $input = $('<input type=checkbox value=0 class=aircraft-chkbx>');
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
    const generalFlight = ['', 'date', 'tailNumber', 'aircraftID', 'depAir', 'enrRout', 'arrAir', 'comments', 'inst', 'stu']
    const generalFlightInfo = ['General Flight Information', 'general', 'Date', 'Tail Number', 'Aircraft Type', 'Departure Airport', 'Enroute Airports', 'ArrivalAirports', 'Comments', 'Instructor', 'Student']
    createInputLoop(generalFlight, generalFlightInfo)

    // Landings and Approaches
    const approachLanding = [0, 'approach', 'holds', 'totalLandings', 'dayLdg', 'nightLdg']
    const approachLandingInfo = ['Aproaches and Landings', 'app', 'Approach', 'Holds', 'Total Landings', 'Day Landing', 'Night Landing']
    createInputLoop(approachLanding, approachLandingInfo)
    // Times
    const flightTimesIds = ['0.00', 'total', 'cxt', 'night', 'hood', 'imc', 'dualI', 'cfi', 'sic', 'pic', 'solo']
    const flightTimesidsLabel = ['Flight Times', 'times', 'Total', 'Cross-Country', 'Night', 'Simulated Instrument', 'IMC', 'Dual (Instruction Recieved)', 'CFI (Instructor)', 'SIC (Second in Command)', 'PIC (Pilot in Command)', 'Solo']
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
    //    $('.form-control').each(function(){
    //     if ($(this).hasClass('app')) {
    //         let appName = $(this).attr('id')
    //         if ($('#'+appName).val().trim()==''){
    //             appName = 0.00
    //         } else {
    //             appName = $("#imc").val().trim()
    //         };
    //         console.log(appName)
    //     }
    //             Error();
    //     });

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
    if ($("#pic").val().trim() == '') {
        pic = 0.00
    } else {
        pic = $("#pic").val().trim()
    };
    if ($("#sic").val().trim() == '') {
        sic = 0.00
    } else {
        sic = $("#sic").val().trim()
    };
    if ($("#dualI").val().trim() == '') {
        dualI = 0.00
    } else {
        dualI = $("#dualI").val().trim()
    };
    if ($("#cfi").val().trim() == '') {
        cfi = 0.00
    } else {
        cfi = $("#cfi").val().trim()
    };
    if ($("#solo").val().trim() == '') {
        solo = 0.00
    } else {
        solo = $("#solo").val().trim()
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


    $.post("/api/flight_time", {
        UserId: userData.id,

        date: $("#date").val(),
        tailNumber: $("#tailNumber").val().trim(),
        AircraftID: $("#aircraftID").val().trim(),
        depAir: $("#depAir").val().trim(),
        enrRout: $("#enrRout").val().trim(),
        arrAir: $("#arrAir").val().trim(),
        comments: $("#comments").val().trim(),
        iap: approach,
        holds: holds,
        landings: totalLandings,
        dayLdg: dayLdg,
        nightLdg: nightLdg,
        total: total,
        cxt: cxt,
        night: night,
        hood: hood,
        imc: imc,
        dualI: dualI,
        cfi: cfi,
        sic: sic,
        pic: pic,
        solo: solo,
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

    const generalAircraftBoolean = ['', 'tailWheel', 'complex', 'highPerf', 'turboFan', 'turboProp', 'rotorcraft', 'poweredLift'];

    const generalAircraftBooleanLabels = ['', 'general', 'Tail Wheel', 'Complex', 'High Perf', 'Turbo Fan', 'Turbo Prop', 'Rotorcraft', 'Powered Lift'];

    createInputLoopCheckboxes(generalAircraftBoolean, generalAircraftBooleanLabels);

    const newButton = $("<button>").attr('id', 'create-aircraft-button').text("Add Aircraft")
    $accordian.append(newButton)

    // changes value of checkbox to 1 if it is checked
    $('.aircraft-chkbx').change(function () {
        const checkbox = $(this);
        if (checkbox.prop('checked', 'true')) {
            checkbox.val(1);
        };
    });

    $('#create-aircraft-button').on('click', function (e) {
        e.preventDefault();
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
        rotorcraft: $("#rotorcraft").val(),
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
        // .then(async flights => await displayFlightTimeTable(flights))
        .then(async flights => await displayFlights_FLEX(flights))
        .catch(err => console.error(err));
};

function displayFlights_FLEX(raw_flights) {
    console.log(raw_flights);
    const TABLE = $("#flextest");

    const flights = raw_flights.map(f => ({
        Date: moment(f.date).format("MM/DD/YY"),
        Aircraft: f['Aircraft.aircraftType'],
        'Tail Number': f.tailNumber,
        'Departure Airport': f.depAir,
        'Enroute Airport(s)': f.enrRout,
        'Arrival Airport': f.arrAir,
        'Flight Number': f.flightNum,
        'Departure Time': moment(f.depTime).format("hh:mm A"),
        'Arrival Time': moment(f.arrTime).format("hh:mm A"),
        Landings: f.landings,
        'IMC': f.imc,
        Hood: f.hood,
        IAP: f.iap,
        Holds: f.holds,
        PIC: f.pic,
        SIC: f.sic,
        CFI: f.cfi,
        Dual: f.dualI,
        'X-C': f.cxt,
        Solo: f.solo,
        Total: f.total,
        'Day Landings': f.dayLdg,
        Night: f.night,
        'Night Landing': f.nightLdg,
        Instructor: f.instructor,
        Student: f.student
    }));

    const header = $("<div>").addClass('row');
    const index = $("<div>").addClass("col").text("#");
    header.append(index);
    const headers = Object.keys(flights[0]);
    for (var i = 0; i < headers.length; i++) {
        const key = $("<div>").addClass("col").text(headers[i])
        header.append(key);
    };
    TABLE.append(header);

    for (let i = 0; i < flights.length; i++) {
        const row = $("<div>").addClass('row');
        row.data("flight", raw_flights[i].id);
        row.click(clickFlightRow);

        const index = $("<div>").addClass("col").text(i + 1);
        row.append(index);

        const keys = Object.keys(flights[0]);
        for (let j = 0; j < keys.length; j++) {

            const col = $("<div>").addClass("col");
            const value = flights[i][keys[j]];
            col.text(value);

            row.append(col);
        };
        TABLE.append(row);

        const hiddenRow = $("<div>").addClass('row hidden-row').css("display", "none").data("flight", raw_flights[i].id);
        const comments = $("<div>").addClass('col').text("Comments:");
        const _comments = $("<div>").addClass('col').text(raw_flights[i].comments);

        hiddenRow.append(comments, _comments);
        TABLE.append(hiddenRow);
    };
};
function clickFlightRow() {
    const id = $(this).data("flight");
    $(".hidden-row").each(function (i, element) {
        if (id === $(element).data("flight")) {
            // $(this).show();
            $(this).toggle();
        }
        //  else {
        //     $(this).hide();
        // };
    });
};

// function for displaying all flight times in a table
// function displayFlightTimeTable(flights) {
//     console.log("flights: ", flights) // flights is an array of objects coming back from the db, where each object is 1 flighttime.
//     // console.log("flights Keys: ", Object.keys(flights[0]))

//     // creates an array of names from flight_time table to use as table column names
//     //doing this in html, but saving the code for potential future refactoring
//     // let col = [];
//     // for (let i = 0; i < flights.length; i++) {
//     //     for (const key in flights[i]) {
//     //         if (col.indexOf(key) === -1) {
//     //             col.push(key);
//     //         };
//     //     };
//     // };
//     // console.log(col);

//     // pushing the values from the flgihts object into an array
//     // array to hold flight_time data
//     let data = [];
//     const $tbody = $("#body");
//     let $tr;
//     let $td;
//     for (let i = 0; i < flights.length; i++) {
//         // extract the values from flight_time and push them into data array in order to populate the table
//         $th = $("<th>")
//             .attr("scope", "row")
//             .text([i + 1]);
//         $tr = $("<tr>")
//         for (const values in flights[i]) {
//             // push all the flights data into the array, except for the Aircraft object
//             // if (typeof flights[i][values] !== "object") {
//             //     data.push(flights[i][values])
//             //     // push the first 32 indeces of the array into a new array
//             //     //
//             // };
//             // console.log("flights at i .id: ",flights[i].id)
//             if (flights[i][values] == 0) {
//                 $td = $("<td>").text('')
//             } else {
//                 $td = $("<td>").text(flights[i][values]); //flights[i] {id:4, date:...}
//             }
//             $tr.append($td)
//         };

//         let $button = $("<button>")
//             .text("Edit")
//             .attr('data-ft-id', flights[i].id)
//             .addClass('editButton');
//         const $delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-flight'>")
//             .attr('data-ft-id', flights[i].id)
//         $tr.append($button, $delBtn);
//         $tbody.append($th, $tr);

//         // pushing the values from the aircraft object into an array
//         let aircraftValues = []
//         for (const values in data[32]) {
//             // console.log("DATA32VALUES: ", data[32][values])
//             aircraftValues.push(data[32][values])
//         };
//         // console.log(data[32].id)
//         // console.log("Aircraft Values: ", aircraftValues)
//     };
//     $('.delete-flight').click(function (event) {
//         const flightDeleteId = $(this).attr('data-ft-id')
//         deleteFlights(flightDeleteId)
//     })

//     $('.editButton').click(function (event) {
//         event.preventDefault();
//         const flightEditId = $(this).attr('data-ft-id')
//         $accordian.empty();
//         $('#create').collapse('toggle')
//         createFlight()
//         editFlightsAPICall(flightEditId)

//     })
// };


function editFlightsAPICall(flightId) {
    $.ajax({
        method: "GET",
        url: `/api/flight_time/${userData.id}/${flightId}`
    })
        .then(async flight => await editFlightTime(flight))
        .catch(err => console.error(err));
};

function editFlightTime(flight) {
    console.log(flight)
    $('.form-control').each(function () {
        console.log($(this).attr('id'))
    })
    $("#date").val(flight[0].date);
    $("#tailNumber").val(flight[0].tailNumber);
    $("#aircraftID").val(flight[0].aircraftId);
    $("#depAir").val(flight[0].depAir);
    $("#enrRout").val(flight[0].enrRout);
    $("#arrAir").val(flight[0].arrAir);
    $("#comments").val(flight[0].comments);
    $("#inst").val(flight[0].instructor);
    $("#stu").val(flight[0].student);
    $("#approach").val(flight[0].iap);
    $("#holds").val(flight[0].holds);
    $("#totalLandings").val(flight[0].landings)
    $("#dayLdg").val(flight[0].dayLdg)
    $("#nightLdg").val(flight[0].nightLdg)
    $("#total").val(flight[0].total)
    $("#cxt").val(flight[0].cxt)
    $("#night").val(flight[0].night)
    $("#hood").val(flight[0].hood)
    $("#imc").val(flight[0].imc)
    $("#dualI").val(flight[0].dualI)
    $("#cfi").val(flight[0].cfi)
    $("#pic").val(flight[0].pic)
    $("#sic").val(flight[0].sic)
    $("#solo").val(flight[0].solo)

};

// To delete flights function
function deleteFlights(deleteId) {
    $.ajax({
        method: "DELETE",
        url: `/api/flight_time/delete/${userData.id}/${deleteId}`
    })
        // attempting to refresh the page. Not currently doing that as desired. Trying to call the document load function to repopluate the table at the bottom of the page.
        .then(getFlights(userData.id))
        .catch(err => console.error(err));
};