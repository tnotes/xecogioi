const get_cookie = require('./module/get-cookie');
const get_info = require('./module/get-info');
let scan = async (cookie)=>{

	
	let find_data_status_false = await Data.find({status:false}).limit(1);
	if(find_data_status_false.length === 0) {
		await Status.update({status:true}).set({status:false});
		return true;
	};
	let {code} = find_data_status_false[0];
    let info = await get_info(code,cookie);
    console.log(info);
	await Data.update({code}).set({...info,status:true});
	return await scan(cookie);
	
};
module.exports = async ()=>{
	let find_status_scan = await Status.find();
	let status = false;
	if(find_status_scan.length === 0) {
		await Status.create({status:false});
	}else{
		status = find_status_scan[0].status;
	};

	if(status) return true;
	await Status.update({status:false}).set({status:true});
	let cookie = await get_cookie();
	return await scan(cookie);
	
};