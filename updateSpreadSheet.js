//google sheet
const GOOGLE_SPREADSHEET_ID = "1KLbE7fZMUkKfD9vq-zhiDrmFmk2xjN3avPc7r654y24";
//connect to google api
const {google} = require('googleapis');
const sheets = google.sheets('v4');
let {OAuth2Client} = require('google-auth-library');



//Define interface to update SpreadSheet

const updateSpreadsheet = ( profile ) => {
	// credentials can't be stored locally
	const creds = {
		      client_email: 'devcenter-backend@devcenter-backend.iam.gserviceaccount.com',
		      private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+mcyMfTEwVGcm\nRaZD8fOqTrao2ns1JnUFvAbMwJmNqWVja+xOj6ebvqQ5DWHSsPyRuY34z27jHZ7A\n41b/cfQAXLaioXgyKW1iSum17u2FqgNW3e6Jsyi3PU2gK6oYLUnytdk7IWlpyf2n\n0SqGJhJmC5J2TXdioPZqRozse3xWxalJLcYhQ/WTllUciIXMigAveAK8lkg5kIyX\n+aZR4d3K2ctA6czdQ0DbpBTEJoO8Njw7SF4wBo7mMJmqf5yxkkHN7ETTPes8eN3x\nEGxyuXKlVs0Uq5SC+TsZqNLdwkLFX2XE+bcKszJI3UPQdpuBifMCH7skTc5uJuQm\nsV/Uif4PAgMBAAECggEAA+x8SrDHGEoch4FWj2kwjXh/snvbnnf+CmdZB9JijDPe\nYPdspB9j9sUBciU64XtVmmsPUlMe4sZjfsVkr0SOyTUfaLtZ6Jp0Dy/LSOdeyhTP\nwHQ4KsCJSDXBs9hCRlYkWBPzTBAqMIyBJXkdCX7ze636+WbV3C4ZHzii7Q62Zr4z\ngRo72UHzwKap3OSI6iNOmRYy6mAluKF87JnysOzt5kT+a5UaW3/Scr3YChJ6KZo7\nDlQcYUFp8b6w0h96zhLpzvtXnRv+MThX6GeEz8e82ah1ACiiDFnn+G7TYarN1TBN\nY7ckNmesZlAXlfvn8gN0gZUQEV5xA6yL9sR6IYREkQKBgQDxROHITMkXh/1eZ7vY\nOtgOK0TvtA9h1Ml0YXZkVd8W/+WRLRv+RC0/qW3O2fFb74pWHwnYOJwUub/HaHx+\nmlR6Zm0kTtRyX5cuFYRiMfDpIqyEqRSnkhDOpSEQkhgWQKVyx16vpBYz8B8GHVKy\n4g9F99MqRc7F8K2bMu+pmBm1sQKBgQDKPPROYQ6NOaide6RUg3QjVs88SgJgCCQ/\n8qu+rAqW4Cmi3cjywcjBjj87lu/ywAq9/9BV9Ero5HAU3NoNERCUCNDjxp0GqHkc\nuajXL6Iu/Uc0eZLmzxQRT/q/xFcQmG80q9m45m3pALPCyuxjuHs9z1aH3n6UuQLT\nP+NQ+csfvwKBgBvcaHZI56/f9FJCiF6f7PM16/ACSwRxHhJibtmHUQvG4Suymdjy\n5obDefq5EDYdo0vuqaReZSe/i3XrivTTvY2k5lWbBM1wXHTl5zOvsLI7XtCy9b+k\nDmzOhNL1C/MF5BUtELIXsLiuseZy3Gnr0Pezdp8bEJWrBWE2sJZVCiMBAoGBAKEv\n1+AohzqUPAnYo+8gHo6T//QjYKU9l/bH6Y68/GuoGkdO0Xx6axGp2EgcUv59hZJN\ns7TuUk4w1AwswjYr5bS3GhaRFFJcMLtuVl27/13ITNpME4OWhH4P6uCxEluNwwSN\n+6fdMLjG8H9O0P3h6YgoGuWLtgO/Obs5bmn5zaVtAoGBANbIiJa40oPC5CEokRbl\nqxkaamQHQo1whMgxF4sW35MtG+PXjqfbqLbT4nQvy9l4C6nqW9NWdLRVABKzuxm2\nLcY8dr1zStnSLlYsJR8yLY+dh7Fd+5NxCF39PM75YnecXh3rtJMyP7QInuaespJY\nUgQU4cb6U6KONr7SdG8XvFlf\n-----END PRIVATE KEY-----\n'
		}

	// Define scopes
	const scopes = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'];

	// Defines client
	const jwtClient = new google.auth.JWT(creds.client_email, null, creds.private_key, scopes);
	let auth_mode = 'jwt';
	jwtClient.authorize(function(error, tokens) {

			if (error) {
				console.log("Error making request to generate access token:", error);
			} else if (tokens.access_token === null) {
				console.log("Provided service account does not have permission to generate access tokens");
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
					  }, (err, response) => { if (err) return console.error(err);}
				  );
			}
	});
};

module.exports = { updateSpreadsheet };
