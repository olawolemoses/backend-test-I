const { prompt } = require('inquirer');

const program = require('commander');

let { streamListener } = require('./streamListener');


program
.version('0.0.1')
.description('Twitter Bot to extract details from people\'s Bio based on hashtags and number of followers\n')
.description(' and updates them on a Google Spreadsheet.');



const questions = [
  {
    type : "input",
    name : "hashtags",
    message : "[+] Enter each hashtag separated by a comma or space: "
  },
];

program
.command('runBot') 
.alias('run')
.description('run the bot to search twitter')
.action(() => {
  prompt(questions).then( answers => { 
	  
	  	// extract hashtags from input 
		var hashtags = answers.hashtags.split(/[ ,]+/);
		
		//improve hashtag
		hashtags = hashtags.map( tag => {
			if( tag.charAt(0) != "#"){
				tag = "#" + tag;
			}
			return tag;
		});
		
		console.info("[-] Filter stream based on the following hashtags: ["+ hashtags.join(", ") + "]");

		console.log("----------------------------------------------------------------------------------");
		
		streamListener( hashtags );
		
  });
});

program.parse(process.argv);