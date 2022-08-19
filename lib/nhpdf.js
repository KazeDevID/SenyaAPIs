let nhentai = require("nhentai-js");
let topdf = require("image-to-pdf");
let request = require("request");
let fs = require("fs-extra");

exports.nhentaidl = async (code) => {
	let count = 0;
	let ResultPdf = [];
	let doujin = await nhentai.getDoujin(code);
	let title = doujin.title;
	let array_page = doujin.pages.map((a) => a.replace(/(t[0-9]\.nhentai)/, "i.nhentai"));

	//if (array_page.length > 50) return msg.reply("terlalu banyak halaman, Maks Page 50!");
	for (let i = 0; i < array_page.length; i++) {
		//if (!fs.existsSync("./tmp/nhentai")) fs.mkdirSync("./tmp/nhentai");
		let image_name = "./tmp/nhentai/" + code + i + ".jpg";
		await new Promise((resolve) =>
			request(array_page[i]).pipe(fs.createWriteStream(image_name)).on("finish", resolve)
		);
		console.log(array_page[i]);
		ResultPdf.push(image_name);
		count++;
	}

	await new Promise((resolve) =>
		topdf(ResultPdf, "A4")
			.pipe(fs.createWriteStream("./tmp/nhentai/" + code + ".pdf"))
			.on("finish", resolve)
	);

	for (let i = 0; i < array_page.length; i++) {
		fs.unlink("./tmp/nhentai/" + code + i + ".jpg");
	}

};
