

  function shuffle(array){
    for(let i = array.length -1; i > 0; i--){
      const random = Math.floor(Math.random() * (i+1));
      [array[i], array[random]] = [array[random], array[i]]
    }
  }






function updateSDF(sdf) {
let element = document.querySelector('#container-01');
let config = { backgroundColor: 'orange' };
let viewer = $3Dmol.createViewer( element, config );
  let pdbUri = sdf ;
  jQuery.ajax( pdbUri, { 
    success: function(data) {
      let v = viewer;
      v.addModel( data, "sdf", { keepH: false });                      /* load data *  /* style all atoms */
v.setStyle({stick:{ opacity:'1.0'}, sphere:{radius: 0.4},},);  /* style all atoms */
      v.zoomTo();                                      /* set camera */
      v.render();                                      /* render scene */
      v.zoom(1.2, 1000);    
    },
    error: function(hdr, status, err) {
      console.error( "Failed to load PDB " + pdbUri + ": " + err );
    },
  });
}

function updateOptions(array) {
  for( let i =0; i < array.length; i++) {
    const btn = document.getElementById(`NameOP${i+1}`);
    btn.innerText = array[i].name;}
  shuffle(array)
  for( let i =0; i < array.length; i++) {
    const btn3= document.getElementById(`ThreeOP${i+1}`);
    btn3.innerText=array[i].three; }
  shuffle(array)
  for( let i =0; i < array.length; i++) {
    const btn1 = document.getElementById(`OneOP${i+1}`);
    btn1.innerText=array[i].one
  }
}





function options_updator(aa) {
function correctColor(btn, answer) {
  if(btn.innerText===answer){
    btn.addEventListener("click", function () {
      btn.style.backgroundColor = 'green';
    })
    } else {btn.addEventListener("click", function () {
        btn.style.backgroundColor= 'red';
    })
      
  }
  }


const allBtn = document.getElementsByClassName("button-88");


for(let btn of allBtn) {
  if(btn.id.startsWith("NameOP")) {
    correctColor(btn, aa.name);
  } 
  else if(btn.id.startsWith("ThreeOP")) {
    correctColor(btn, aa.three);
  }
  else if (btn.id.startsWith("OneOP")) {
    correctColor(btn, aa.one);
  }
}
}

function updatePage(aEle, currentAA) {
  
  document.getElementById("box1").innerHTML = `<img src=${aEle.svg}>`;
  document.getElementById("box3").innerText =`${aEle.formula}`;
  updateSDF(aEle.sdf);
  updateOptions(currentAA)
  options_updator(aEle)
  
}

shuffle(AMINOACIDS)


const next_btn=document.getElementById("next_button")

let curAA = 0

function nextAA() {
  if(curAA< AMINOACIDS.length) {
    document.querySelectorAll("*").forEach(el => el.removeAttribute("style"));
    
    let currentAA = AMINOACIDS.filter((aa, i) => i !== curAA);
    shuffle(currentAA);
    currentAA = currentAA.slice(0,3);
    currentAA.push(AMINOACIDS[curAA]);
    shuffle(currentAA);
    updatePage(AMINOACIDS[curAA], currentAA);
    
    curAA+=1 }
}


next_btn.addEventListener("click", function () {
  nextAA()
 
})