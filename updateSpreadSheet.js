//google sheet
const GOOGLE_SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

//connect to google api
const {google} = require('googleapis');
const sheets = google.sheets('v4');
let {OAuth2Client} = require('google-auth-library');

//Define interface to update SpreadSheet
const updateSpreadsheet = ( profile ) => {
	// credentials can't be stored locally
	const creds = {
		      client_email: process.env.GOOGLE_SERVICE_EMAIL,
		      private_key: process.env.GOOGLE_PRIVATE_KEY
		};

	// Define scopes
	const scopes = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'];

	// Defines client
	const jwtClient = new google.auth.JWT(creds.client_email, null, creds.private_key, scopes);
	let auth_mode = 'jwt';
	jwtClient.authorize(function(error, tokens) {

			if (error) {
					console.error("Error making request to generate access token:");
			} else if (tokens.access_token === null) {
				console.error("Provided service account does not have permission to generate access tokens");
			} else {
				accessToken = tokens.access_token;
				sheets.spreadsheets.values.append({
					spreadsheetId: GOOGLE_SPREADSHEET_ID,
						range: 'Sheet1',
						valueInputOption: 'RAW',
						insertDataOption: 'INSERT_ROWS',
						resource: {
					      values: [
					        [profile.profile_name, profile.no_followers]
					      ],
					    },
					    auth: jwtClient
					  }, (err, response) => {
									if (err)
							 			console.error("error");
										//console.error("error on upload");
								 }
				  );
			}
	});
};

module.exports = { updateSpreadsheet };
