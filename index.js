var exalUrl = "http://127.0.0.1:5500/data/lianjin.xlsx"
var dlc=5

window.οnlοad=load();
function load(){
    
    console.log(1)
    let list_domm = document.querySelector('.selectList')
	list_domm.innerHTML = ''
        
    let itemm = document.createElement('tr')
	itemm.className = 'item'
    itemm.innerHTML += `
    <th class="box level">等级</th>
    <th class="name">理符名称</th>
    <th class="place">提交位置</th>
    <th class="box item">提交道具</th>
    <th class="box missionNum">数量</th>
    `
    list_domm.appendChild(itemm)
    console.log(1)
    exalToSheet()
}

function JobOnClick(job)
{
    exalUrl = `http://127.0.0.1:5500/data/${job}.xlsx`;
	
    exalToSheet()
}

function DlcOnClick(a)
{
    dlc =a;
	
    exalToSheet()
}

function exalToSheet(){
    let list = ''
	/* set up async GET request */
	var req = new XMLHttpRequest();
	req.open("GET", exalUrl, true);
	req.responseType = "arraybuffer";
	req.onload = function(e) {
	  var workbook = XLSX.read(req.response);
		list = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[dlc]])


		let list_dom = document.querySelector('.missionList')
		list_dom.innerHTML = ''
        
        let item = document.createElement('tr')
		item.className = 'item'
        item.innerHTML += `
        <th class="box level">等级</th>
        <th class="name">理符名称</th>
        <th class="place">提交位置</th>
        <th class="box exp">经验</th>
        <th class="box gold">奖励金币</th>
        <th class="box item">提交道具</th>
        `
        list_dom.appendChild(item)


		if(exalUrl != `http://127.0.0.1:5500/data/duantie.xlsx`){
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

    item.addEventListener('click',function(e){
        let item = document.createElement('tr')
        item.className = 'item'

        item.innerHTML +=  this.innerHTML

        item.cells[3].remove()
        item.cells[3].remove()


        item.innerHTML += '<th class="box missionNum">1</th>'

        let list_domm = document.querySelector('.selectList')

        for(let i=0;i<list_domm.rows.length;i++){
            if(list_domm.rows[i].cells[1].innerHTML == item.cells[1].innerHTML)
            {
                list_domm.rows[i].cells[4].innerHTML++
                return
            }
        }

        list_domm.appendChild(item)
    },false)

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
    

    item.innerHTML +=  `<td class="box level">${level}</td>`
    item.innerHTML +=  `<td class="name">${missionName}</td>`
    item.innerHTML +=  `<td class="place">${dataData[3]}</td>`
    item.innerHTML +=  `<td class="box exp">${dataData[1]}</td>`
    item.innerHTML +=  `<td class="box gold">${dataData[0]}</td>`
    item.innerHTML +=  `<td class="box item">${dataData[4]}</td>`

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
    

    item.innerHTML +=  `<td class="box level">${level}</td>`
    item.innerHTML +=  `<td class="name">${missionName}</td>`
    item.innerHTML +=  `<td class="place">${dataData[1]}</td>`
    item.innerHTML +=  `<td class="box exp">${dataData[2]}</td>`
    item.innerHTML +=  `<td class="box gold">${dataData[3]}</td>`
    item.innerHTML +=  `<td class="box item">${dataData[4]}</td>`

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
    

    item.innerHTML +=  `<td class="box level">${level}</td>`
    item.innerHTML +=  `<td class="name">${missionName}</td>`
    item.innerHTML +=  `<td class="place">${dataData[1]}</td>`
    item.innerHTML +=  `<td class="box exp">${dataData[2]}</td>`
    item.innerHTML +=  `<td class="box gold">${dataData[3]}</td>`
    item.innerHTML +=  `<td class="box item">${dataData[4]}</td>`

    return item
}

