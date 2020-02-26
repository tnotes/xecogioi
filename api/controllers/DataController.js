const fs = require('fs');
module.exports = {
	upload:async function(req,res){
		req.file('avatar').upload(async function (err, uploadedFiles) {
			
			if(!(uploadedFiles[0] || {filename:''}).filename.includes('.txt')) return res.send('File tải lên phải đúng định dạng .txt');
			
			let content = fs.readFileSync(uploadedFiles[0].fd, 'utf8');
			let list_code = content.split('\n');
			for(let code of list_code){
				let find_code = await Data.find({code});
				if(find_code.length === 0){
					await Data.create({code});
				}
			}
			Scan();
			return res.send('Tải lên thành công '+list_code.length+' biển số.');
		});
	},
	view:async function(req,res){
		let {code} = req.query;
		let data = {status:false};
		let find_data = await Data.find({code});
		if(find_data.length > 0) data = find_data[0];
		return res.view('pages/data',{data});
	},
	backup:async function(req,res){
		let data = await Data.find({}).limit(1000000000000000);
		
		res.setHeader('Content-disposition', 'attachment; filename=backup.txt');
		res.setHeader('Content-type', 'text/plain');
		res.charset = 'UTF-8';
		res.write(JSON.stringify(data));
		res.end();
	}
}