import React, { useState } from "react";
import Table from "./Table";
import axios from "axios";

function Weather() {
	const [locations, setLocations] = useState([]);
	const [locationName, setLocationName] = useState("");

	//on form submit, call the handleSubmit method
	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios
			.get(`http://localhost:5000/weather/${locationName}`)
			.then((res) => {
				if (res.data.length === 0) {
					setLocations([]);
					alert("No location found");
					return;
				}
				setLocations(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="weather-container">
			<div className="container">
				<h2 className="heading text-center">What's the weather like today?</h2>
				<form method="get" onSubmit={handleSubmit}>
					<div className="input-group mb-3">
						<input
							type="text"
							className="form-control"
							placeholder="Enter a name of a location e.g. london"
							aria-label="name of location"
							aria-describedby="button-addon2"
							value={locationName.toLowerCase()}
							onChange={(e) => setLocationName(e.target.value)}
							autoFocus
						/>
						<button className="btn btn-outline-secondary" type="submit">
							Search
						</button>
					</div>
				</form>
				<div className="data-view">
					<p id="view" className="text-center">
						Results will be displayed below
					</p>
				</div>
				{/* pass the locations as object props */}
				<Table locations={locations} />
			</div>

			<footer className="position-absolute bottom-0 end-0">
				<p className="footer-text">Project for Mind-Alliance 2021</p>
			</footer>
		</div>
	);
}

export default Weather;
