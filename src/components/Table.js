import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import london from "./defaultState";

//pass down the locations to the table component as props, use data to populate table
//set default state to london to avoid undefined/null
function Table({ locations }) {
	const [consolidatedData, setconsolidatedData] = useState(london);

	//async/await function to retrieve the data after api request
	const handleClick = async (locId) => {
		await axios
			.get(`https://www.metaweather.com/api/location/${locId}`)
			.then((res) => {
				setconsolidatedData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<table className="table table-hover">
				<thead>
					<tr className="table-head">
						<th scope="col">Location Name</th>
						<th scope="col">Location Type</th>
						<th scope="col">Latt_Long</th>
					</tr>
				</thead>
			</table>
			<div id="table-container">
				<table className="table table-hover">
					{/* <thead>
						<tr className="table-head">
							<th scope="col">Location Name</th>
							<th scope="col">Location Type</th>
							<th scope="col">Latt_Long</th>
						</tr>
					</thead> */}
					<tbody>
						{/* javascript array map function to return each row */}
						{locations.map((location) => (
							<tr
								key={location.woeid}
								className="table-row"
								data-bs-toggle="modal"
								data-bs-target="#myModal"
								// pass the id to the function on click
								onClick={() => handleClick(location.woeid)}
							>
								<td>{location.title}</td>
								<td>{location.location_type}</td>
								<td>{location.latt_long}</td>
							</tr>
						))}
					</tbody>
				</table>

				<div id="modal-container">
					<Modal consolidatedData={consolidatedData} />
				</div>
			</div>
		</div>
	);
}

export default Table;
