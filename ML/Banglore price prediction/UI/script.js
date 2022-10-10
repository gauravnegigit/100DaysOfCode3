const getBathValue =()=>{
    let uiBtahrooms = document.getElementsByName("BATH");

    for (let i in uiBtahrooms){
        if (uiBtahrooms[i].checked){
            return parseInt(i) + 1;
        }
    }

    return -1 ;
}

const getBHKValue =()=>{
    const uiBHK = document.getElementsByName("BHK");
    for(let i in uiBHK){
        if(uiBHK[i].checked){
            return parseInt(i) + 1; 
        }
    }
    return -1 ;
}

const onClickEstimatePrice=()=>{
    console.log("Estimate price button clicked");
    let sqft = document.getElementById("uiSqft");
    let bhk = getBHKValue();
    let bathrooms = getBathValue();
    let location = document.getElementById("uiLocations"); 
    let estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5000/predict_home_price";

    $.post(url  , {
        total_sqft: parseFloat(sqft.value),
        bhk : bhk,
        bath: bathrooms,
        location: location.value
    } , function(data , status){
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>" ;
        console.log(status);
    });
}

const onPageLoad=()=>{
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/get_location_names";
    $.get(url , function(data , status){
        console.log("got response for get_loction_names request");
        if (data){
            let locations = data.locations;
            let utilLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations){
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;