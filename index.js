function JobOnClick(job)
{
    

    var url = `http://127.0.0.1:5500/data/${job}.xlsx`;
	let list = ''

	/* set up async GET request */
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.responseType = "arraybuffer";
	req.onload = function(e) {
	  var workbook = XLSX.read(req.response);
		list = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
		let list_dom = document.querySelector('.missionList')
		list_dom.innerHTML = ''
        
        let item = document.createElement('tr')
		item.className = 'item'
        item.innerHTML += `
        <th class="box">等级</th>
        <th class="box">理符名称</th>
        <th class="box">提取位置</th>
        <th class="box">经验</th>
        <th class="box">奖励金币</th>
        <th class="box">提交道具</th>`
        list_dom.appendChild(item)


		if(job != "duantie"){
            list_dom.appendChild(addTH((list[0])))
		    list.map(res=>{
			    list_dom.appendChild(addTD(res))
		    })
        }
        else{
            list_dom.appendChild(addTHZhujia((list[0])))
		    list.map(res=>{
			    list_dom.appendChild(addTDZhujia(res))
		    })
        }
	};
	
	req.send();
}


function addTH(data){

    var dataData=new Array()
    for(let sheet in data){
        dataData.push(sheet)
    }
    item = makeitem(data,dataData)

    return item
}
function addTD(data){

    var dataData=new Array()
    for(let sheet in data){
        dataData.push(data[sheet])
    }
    item = makeitem(data,dataData)

    return item
}

function makeitem(data,dataData){
    let item = document.createElement('tr')
    item.className = 'item'
    
    var level = ""
    var missionName = ""
    for(let i=0;i<dataData[2].length;i++){
        if(dataData[2][i]==']'){
            for(let j=1;j<i;j++){
                level+=dataData[2][j]
            }
            for(let z=i+1;z<dataData[2].length;z++){
                missionName+=dataData[2][z]
            }
        }
    }
    

    item.innerHTML +=  `<td class="box">${level}</td>`
    item.innerHTML +=  `<td class="box">${missionName}</td>`
    item.innerHTML +=  `<td class="box">${dataData[3]}</td>`
    item.innerHTML +=  `<td class="box">${dataData[1]}</td>`
    item.innerHTML +=  `<td class="box">${dataData[0]}</td>`
    item.innerHTML +=  `<td class="box">${dataData[4]}</td>`

    return item
}

function addTHZhujia(data){

    var dataData=new Array()
    for(let sheet in data){
        dataData.push(sheet)
    }

    let item = document.createElement('tr')
    item.className = 'item'
    
    var level = ""
    var missionName = ""
    for(let i=0;i<dataData[0].length;i++){
        if(dataData[0][i]==']'){
            for(let j=1;j<i;j++){
                level+=dataData[0][j]
            }
            for(let z=i+1;z<dataData[0].length;z++){
                missionName+=dataData[0][z]
            }
        }
    }
    

    item.innerHTML +=  `<td class="box">${level}</td>`
    item.innerHTML +=  `<td class="box">${missionName}</td>`
    item.innerHTML +=  `<td class="box">${dataData[1]}</td>`
    item.innerHTML +=  `<td class="box">${dataData[2]}</td>`
    item.innerHTML +=  `<td class="box">${dataData[3]}</td>`
    item.innerHTML +=  `<td class="box">${dataData[4]}</td>`

    return item
}

function addTDZhujia(data){

    var dataData=new Array()
    for(let sheet in data){
        dataData.push(data[sheet])
    }
    let item = document.createElement('tr')
    item.className = 'item'
    
    var level = ""
    var missionName = ""
    for(let i=0;i<dataData[0].length;i++){
        if(dataData[0][i]==']'){
            for(let j=1;j<i;j++){
                level+=dataData[0][j]
            }
            for(let z=i+1;z<dataData[0].length;z++){
                missionName+=dataData[0][z]
            }
        }
    }
    

    item.innerHTML +=  `<td class="box">${level}</td>`
    item.innerHTML +=  `<td class="box">${missionName}</td>`
    item.innerHTML +=  `<td class="box">${dataData[1]}</td>`
    item.innerHTML +=  `<td class="box">${dataData[2]}</td>`
    item.innerHTML +=  `<td class="box">${dataData[3]}</td>`
    item.innerHTML +=  `<td class="box">${dataData[4]}</td>`

    return item
}