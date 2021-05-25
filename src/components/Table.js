import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";

//pass down the locations to the table component as props, use data to populate table
function Table({ locations }) {
	const [consolidatedData, setconsolidatedData] = useState({});

	//async/await function to retrieve the data after api request
	const handleClick = async (locId) => {
		await axios
			.get(`https://www.metaweather.com/api/location/${locId}`)
			.then((res) => {
				setconsolidatedData(res.data);
				// console.log(consolidatedData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<div id="table-container">
				<table className="table table-hover">
					<thead>
						<tr className="table-head">
							<th scope="col">Location Name</th>
							<th scope="col">Location Type</th>
							<th scope="col">Latt_Long</th>
						</tr>
					</thead>
					<tbody>
						{/* javascript array map function to return each row */}
						{locations.map((location) => (
							<tr
								key={location.woeid}
								className="table-row"
								id="trigger-modal"
								data-bs-toggle="modal"
								data-bs-target="#myModal"
								return
								the
								function
								on
								click
								onClick={() => handleClick(location.woeid)}
							>
								<td>{location.title}</td>
								<td>{location.location_type}</td>
								<td>{location.latt_long}</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* conditional rendering to render Modal only when data is available*/}

				{typeof consolidatedData.main !== "undefined" && (
					<Modal consolidatedData={consolidatedData} />
				)}
			</div>
		</div>
	);
}

export default Table;
