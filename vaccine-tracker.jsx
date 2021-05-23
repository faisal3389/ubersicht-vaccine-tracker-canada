export const command = () => {
	const url = `https://api.covid19tracker.ca/summary`;
	
	/**
	 * Fetch the quote
	 */
	fetch(url, {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'no-cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached,
		'Access-Control-Allow-Origin': '*',
		headers: {
		  'Content-Type': 'application/json',
		  'Accept': 'application/json'
		},
	  }).then((res) => {
		  console.log('..............', res)
		let summary = res.data[0];
		const total_vaccinated = parseInt(summary.total_vaccinated);
		const total_vaccinations = parseInt(summary.total_vaccinations);
		const total_vaccines_distributed = parseInt(summary.total_vaccines_distributed);
		const population = 38008275 // using this by back tracking it from the % calculations in the https://covid19tracker.ca/vaccinationtracker.html , Hopefully it Won’t change much
		// Store quote as json string
		localStorage.setItem('vaccine-tracker-canada',JSON.stringify({
			first_dose_percentage: num.toString((total_vaccinations - total_vaccinated)/38008275),
			second_dose_percentage: num.toString((total_vaccines_distributed - total_vaccinations -total_vaccinated)/38008275),
		}));
	}).catch(error => {
		// There was an error, probably a network error
		// Fall back is to use the locally stored data if offline
		// in case of first time running, open an issue on github or send error log
		console.log('Unable to get the vaccination data ', error);
	});
  }

/*********************************************************************
 * the refresh frequency in milliseconds
 * 86400000 = every 24h / day
 *********************************************************************/
export const refreshFrequency = 86400000;
/*********************************************************************
 * Extract quote from local storage
 *********************************************************************/
export const first_dose_percentage = JSON.parse(localStorage.getItem('first_dose_percentage'));
export const second_dose_percentage = JSON.parse(localStorage.getItem('second_dose_percentage'));

/**********************************************************************
 * Style here
 **********************************************************************/
export const className =
`
	bottom: 80px;
	left: 10%;
	width: 80%;
	font-weight: 500;
	font-family: -apple-system, Verdana;
	color: #fff;
	line-height: 1.875rem;
	
	.quote-of-the-day-container {
		margin: 0 auto;
		max-width: 960px;
	}
	
	quoteblock, h5, cite {
		text-shadow: 0px 0px 2px rgba(0,0,0,0.30);
	}

	.quote-of-the-day {
		padding: 1rem;
		border-radius: .4rem;
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.quote-of-the-day::before {
		background: rgba(9, 10, 13, 0.10);
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		content: "";
		z-index: -1;
		position: absolute;
		border-radius: .8rem;
	}
	.title {
		text-align: center;
		margin: 0 auto 0.5rem auto;
		color: #cfcfcf;
	}
	.quote {
		font-size: 1rem;
		text-align: center;
		margin-bottom: 0.5rem
		margin-right: 4.5rem;
		margin-top: 0;
		max-width: 85%
	}
	.quote::before {
		content: '"';
		font-size: 1.5rem;
	}
	.quote::after {
		content: '"';
		font-size: 1.5rem;
	}
	.author {
		font-size: .860rem;
		color: #ccc; 
		text-align: end;
		display: block;
		align-self: flex-end;
	}
	.image {
		width: 64px;
		height: 64px;
		position: absolute;
		top: 15px;
		right: 15px;
		border-radius: .4rem;
		box-shadow: 0 0 15px -5px #000;
	}
	/*@media(prefers-color-scheme: light) {
		color: #444444;
		
		.title {
			color: #888888;
		}
		.author {
			color: #666666;
		}
    }*/
`;

export const render = () => {
	return (
		<div className="quote-of-the-day-container">
			<div className="quote-of-the-day">
				<h5 className="title">{first_dose_percentage}</h5>
				<blockquote className="quote">{second_dose_percentage}</blockquote>
			</div>
		</div>
    );
};
