const fs = require('fs');
(async ()=>{
	let content = await fs.readFileSync('./email.txt','UTF-8');
	let email_list = content.split('\n').map(e=>e.trim());
	let list = email_list.reduce(((previous,current)=>previous+'\n'+current),'');
	fs.writeFileSync('./email.txt',list);
	
})();