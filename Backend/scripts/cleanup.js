const fs = require("fs");
const path = require("path");

function deleteStaleImages() {
	const imageLocation = path.join(__dirname, "../public/images");
	fs.readdir(imageLocation, (err, files) => {
		files.forEach((file) => {
			const filePath = path.join(imageLocation, file);

			fs.stat(filePath, (err, stats) => {
				console.log(file, stats);
				currentTime = Date.now();

				const fileAge = currentTime - stats.birthtimeMs;

				if (fileAge > 5 * 60 * 1000) {
					fs.unlink(filePath, (error) => {});
				}
			});
		});
	});
}

module.exports = {
	deleteStaleImages,
};
