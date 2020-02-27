const get_cookie = require('./module/get-cookie');
const get_info = require('./module/get-info');
let waitTime = (time)=>{
	return new Promise(resolve=>{
		setTimeout(function(){
			return resolve(time);
		},time)
	})
};
let scan = async (cookie)=>{

	try{
		let find_data_status_false = await Data.find({status:false}).limit(10);
		if(find_data_status_false.length === 0) {
			await Status.update({status:true}).set({status:false});
			return true;
		};
		let get_info_map = find_data_status_false.map(({code})=>get_info(code,cookie))
	    await Promise.all(get_info_map)
		return await scan(cookie);
	}catch(e){
		await waitTime(5000);
		return await scan(cookie);
	}
	
	
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