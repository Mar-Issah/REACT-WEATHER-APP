const express = require("express");
const app = express();
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
//-----make first get request using route parameter to  get the locations-------
app.get("/weather/:city", async (request, response) => {
	const locationName = request.params.city;
	const apiUrl = `https://www.metaweather.com/api/location/search/?query=${locationName}`;
	const fetchResponse = await fetch(apiUrl);
	const json = await fetchResponse.json();
	response.json(json);
});

//------------making a second get request using route parameter to return consolidated data
app.get("/data/:id", async (request, response) => {
	const locationId = request.params.id;
	const dataUrl = `https://www.metaweather.com/api/location/${locationId}`;
	const dataResponse = await fetch(dataUrl);
	const json = await dataResponse.json();
	response.json(json);
});

//-----------listen------------------
app.listen(port, () => {
	console.log(`server is running on port : ${port}`);
});
