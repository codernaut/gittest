// Time 846 347
//var responseJson = xml2Json(responseBody);
//var data =responseJson["value"];
var jsonBody = pm.response.json();
var data = jsonBody.value[0].plot_name;
var uwi = jsonBody.value[0].wellbore_uwi;
var wellbore_name = jsonBody.value[0].wellbore_name;
var x_coord = jsonBody.value[0].x_coordinate;
var y_coord =  jsonBody.value[0].y_coordinate;
console.log(y_coord);
var requestURL = pm.environment.get("trgOdataUrl")+"/"+pm.environment.get("trgProject")+"/Wellbore?$filter=wellbore_uwi eq '"+uwi+"'&$format=JSON";
 

pm.sendRequest({
    url: requestURL,
    method: 'GET',
    header: {        
        'authorization': request.headers["authorization"]
    },
},
        function (err,res){
        if (err === null) {
            var data = res.json(); 
           if(wellbore_name === data.value[0].wellbore_name && x_coord ===data.value[0].x_coordinate && y_coord ===data.value[0].y_coordinate ) 
           {               
               pm.test("Data has been validated", function () {
                        true;
                    });
            }
            else
            {
               pm.test("Data has been validated", function () {
                        false;
                    });
            }
        }
});

//tests["Data has been validated"] = true;

