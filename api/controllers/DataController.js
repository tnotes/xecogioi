const fs = require('fs');
const Excel = require('exceljs');
module.exports = {
	upload:async function(req,res){
		req.file('avatar').upload(async function (err, uploadedFiles) {
			
			if(!(uploadedFiles[0] || {filename:''}).filename.includes('.txt')) return res.send('File tải lên phải đúng định dạng .txt');
			
			let content = fs.readFileSync(uploadedFiles[0].fd, 'utf8');
			let list_code = content.split('\n');
			for(let code of list_code){
				code = code.replace(/(\r\n|\n|\r)/gm, "").trim();
				let find_code = await Data.find({code});
				if(find_code.length > 0){
					await Data.update({code}).set({status:false});
				}
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
	uploadFilter:async function(req,res){
		req.file('codeFilter').upload(async function (err, uploadedFiles) {
			
			if(!(uploadedFiles[0] || {filename:''}).filename.includes('.txt')) return res.send('File tải lên phải đúng định dạng .txt');
			
			let content = fs.readFileSync(uploadedFiles[0].fd, 'utf8');
			let list_code = content.split('\n');

			let workbook = new Excel.Workbook();
			workbook.addWorksheet('Thoi_gian_dang_kiem_gan_nhat');
			let worksheet = workbook.getWorksheet('Thoi_gian_dang_kiem_gan_nhat');
			worksheet.columns = [
			{header:'Biển kiểm soát',key:'code', width: 20},
			{ header: 'Đơn vị kiểm định', key: 'don_vi_kiem_dinh', width: 20},
			{ header: 'Ngày KĐ', key: 'ngay_KD', width: 20},
			{header:'Số tem GCN',key:'so_tem_GCN', width: 20},
			{header:'Thời hạn KĐ',key:'thoi_han_KD', width: 20},

			];
			
			


			for(let code of list_code){
				code = code.replace(/(\r\n|\n|\r)/gm, "").trim();
				let find_code = await Data.find({code});
				if(find_code.length > 0){
					let {code,lan_cuoi_kiem_dinh_da_thuc_hien} = find_code[0];
					let {don_vi_kiem_dinh,ngay_KD,so_tem_GCN,thoi_han_KD} = lan_cuoi_kiem_dinh_da_thuc_hien[0];
					worksheet.addRow({code,don_vi_kiem_dinh,ngay_KD,so_tem_GCN,thoi_han_KD});

				}
			}
			workbook.xlsx.writeBuffer()
			.then(function(buffer) {
				res.setHeader('Content-disposition', 'attachment; filename=Thoi_gian_dang_kiem_gan_nhat.xlsx');
				res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
				res.charset = 'UTF-8';
				res.write(new Buffer(buffer, 'base64'));
				return res.end();
			});
		});
	},
	
}