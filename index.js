/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Inquirer.js get user input
inquirer.prompt([
    {
        type: 'input',
        name:'siteUrl',
        message: 'Enter your desired site URL',
    }
])
.then((answer) => {
    // Write the name of the url entered into the txt file
    const {siteUrl} = answer;
    fs.appendFileSync("URL.txt", `${siteUrl}\n`,  (err) => {
        // If error
        if (err) throw err;
        // Else log to the console that all went well
        console.log('The file has been saved');
    });

    // Generate a qr image of the siteUrl
    const qr_png = qr.image(siteUrl, { type: "png" });
    // Store link into qrcode.png file in the directory
    qr_png.pipe(fs.createWriteStream("qrcode.png"));
    const png_string = qr.imageSync(siteUrl, { type: "png" });
  
})
.catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
});