import React, { useState } from "react";

function Modal({ consolidatedData }) {
	const [consolidatedWeather, setconsolidatedWeather] = useState([]);
	if (consolidatedData === undefined) return;
	// console.log(data);
	const title = consolidatedData.title;

	//set the consolidated weather and use the info to populate the table
	setconsolidatedWeather(
		consolidatedData.consolidated_weather[
			consolidatedData.consolidated_weather.length - 1
		]
	);

	//get date
	const date = new Date(consolidatedWeather.created)
		.toString()
		.substring(0, 15);

	return (
		<div>
			<div
				className="modal fade"
				id="myModal"
				tabIndex="-1"
				aria-labelledby="myModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog border border-secondary rounded">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="myModalLabel">
								{title + ", " + date}
							</h5>
							<button
								type="button"
								className="btn-close btn-danger"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div>
							<div className="image-container d-flex justify-content-center mt-3">
								<img
									className="icon"
									src={`https://www.metaweather.com//static/img/weather/${consolidatedWeather.weather_state_abbr}.svg`}
									alt={consolidatedWeather.weather_state_name}
								/>
								<div className="deg-celcius">
									<p>{consolidatedWeather.weather_state_name}</p>
									<h1 className="ml-3">
										{consolidatedWeather.the_temp} &#8451;
									</h1>
								</div>
							</div>
						</div>
						<div className="container">
							<table className="table data-container">
								<tbody>
									<tbody>
										<tr>
											<td>Maximum Temperature</td>
											<td>{consolidatedWeather.max_temp} &#8451;</td>
										</tr>
										<tr>
											<td>Humidity</td>
											<td>{consolidatedWeather.humidity + " %"}</td>
										</tr>
										<tr>
											<td>Visibility</td>
											<td>
												{consolidatedWeather.visibility.toFixed(2) + " %"}
											</td>
										</tr>
										<tr>
											<td>Wind Speed</td>
											<td>
												{consolidatedWeather.wind_speed.toFixed(2) + " km/h"}
											</td>
										</tr>
										<tr>
											<td>Wind Direction</td>
											<td>
												{consolidatedWeather.wind_direction.toFixed(2)} &#176;
											</td>
										</tr>
									</tbody>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
