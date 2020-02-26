const request = require('request-promise');
const cheerio = require('cheerio');

module.exports = async (code,cookie)=>{
	var headers = {
		'Connection': 'keep-alive',
		'Cache-Control': 'max-age=0',
		'Origin': 'http://www.vr.org.vn',
		'Upgrade-Insecure-Requests': '1',
		'Content-Type': 'application/x-www-form-urlencoded',
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.103',
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
		'Referer': 'http://www.vr.org.vn/ptpublicweb/ThongTinPT.aspx',
		'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
		cookie
	};

	var dataString = '__VIEWSTATE=%2FwEPDwUKLTQ5NTczMDU2Mg9kFgICAQ9kFgICBA8PFgIeB1Zpc2libGVoZBYCAjMPPCsACwBkZC73sIuYTd5GzL3rUanRFumpdJchzicog8YA05UR84iE&__VIEWSTATEGENERATOR='+code+'&__EVENTVALIDATION=%2FwEdAAPTuk9WpxQUWXSZhaKAi8ckSqtNnA5eNlYWoj%2Fqgbi7PM34O%2FGfAV4V4n0wgFZHr3dQET9xtYVn%2FAb9y8p72%2Fn1nVvt2nu1lq83WXgR8gEIRw%3D%3D&txtBienDK='+code+'&Button1=Tra+c%E1%BB%A9u';

	var options = {
		url: 'http://www.vr.org.vn/ptpublicweb/ThongTinPT.aspx',
		method: 'POST',
		headers: headers,
		body: dataString
	};
	let responseHTML = await request(options);
	let $ = cheerio.load(responseHTML);

	let loai_phuong_tien = $('span#txtLoaiPT').text();
	let so_may_thuc_te = $('span#txtSoMay').text();
	let chu_phuong_tien = $('span#txtChuPT').text();
	let dia_chi_chu_phuong_tien = $('span#txtDiaChi').text();
	let nhan_hieu = $('span#txtNhanHieu').text();
	let so_khung_thuc_te = $('span#txtSoKhung').text();
	let khoi_luong_ban_than = $('span#txtTuTrongTK').text();
	let so_nguoi_cho_phep_tro = $('span#txtSoCho').text();
	let kinh_doanh_van_tai = $('span#txtKDVT').text();
	let lap_dat_thiet_bi_GSHT = $('span#txtTB_GSHT').text();
	let cong_thuc_banh_xe = $('span#txtCTBanhXe').text();
	let kich_thuoc_bao = $('span#txtKichThuocBao').text();
	let chieu_dai_co_so = $('span#txtChieuDaiCoSo').text();
	let khoi_luong_hang_hoa_chuyen_cho_cho_phep_TGGT = $('span#txtTaiTrongGT').text();
	let khoi_luong_toan_bo_cho_phep_tham_gia_giao_thong = $('span#txtTrLgToanBoGT').text();
	let khoi_luog_keo_theo_cho_phep = $('span#txtTrLgToanBoGT').text();
	let phuong_tien_cai_tao = $('span#txtCaiTao').text();
	let vet_banh_xe = $('span#txtVetBanhXe').text();
	let kich_thuoc_thung_hang = $('span#txtKichThuocThung').text();
	let co_lop = $('span#txtCoLop').text();

	let lan_cuoi_kiem_dinh_da_thuc_hien = [];
	$('table#DGKiemDinh').find('tr[style="color:#4A3C8C;background-color:#E7E7FF;font-family:Arial;font-size:Medium;"]').each(function(){
		let don_vi_kiem_dinh = $(this).find('td').eq(0).text();
		let ngay_KD = $(this).find('td').eq(1).text();
		let so_tem_GCN = $(this).find('td').eq(2).text();
		let thoi_han_KD = $(this).find('td').eq(3).text();

		lan_cuoi_kiem_dinh_da_thuc_hien.push({don_vi_kiem_dinh,ngay_KD,so_tem_GCN,thoi_han_KD})
	})
	return {loai_phuong_tien,so_may_thuc_te,chu_phuong_tien,dia_chi_chu_phuong_tien,nhan_hieu,so_khung_thuc_te,khoi_luong_ban_than,so_nguoi_cho_phep_tro,kinh_doanh_van_tai,lap_dat_thiet_bi_GSHT,cong_thuc_banh_xe,kich_thuoc_bao,chieu_dai_co_so,khoi_luong_hang_hoa_chuyen_cho_cho_phep_TGGT,khoi_luong_toan_bo_cho_phep_tham_gia_giao_thong,khoi_luog_keo_theo_cho_phep,phuong_tien_cai_tao,vet_banh_xe,kich_thuoc_thung_hang,co_lop,lan_cuoi_kiem_dinh_da_thuc_hien}
};