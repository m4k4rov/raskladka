  let mapu=new Map([
    ["q","й"],["w","ц"],["e","у"],["r","к"],["t","е"],["y","н"],["u","г"],["i","ш"],["o","щ"],["p","з"],["{","Х"],["[","х"],["}","Ъ"],["]","ъ"],
    ["a","ф"],["s","ы"],["d","в"],["f","а"],["g","п"],["h","р"],["j","о"],["k","л"],["l","д"],[";","ж"],[":","Ж"],["'","э"],["\u0022","Э"],["|","/"],
    ["z","я"],["x","ч"],["c","с"],["v","м"],["b","и"],["n","т"],["m","ь"],[",","б"],["<","Б"],[".","ю"],[">","Ю"],["/","."],["?",","],["`","ё"],["~","Ё"]
  ]);
  let iskl=["[","{","]","}","х","Х","ъ","Ъ",";",":","ж","Ж","'","э","\u0022","Э",",","б","<","Б",".","ю",">","Ю","/",".","?",",","`","ё","~","Ё"];
  //let yazik=prompt("Как переводить\n1. С английской раскладки на русскую\n2. С русской раскладки на английскую","2");
  //let stroka=prompt("Введите строку","Строка для перевода");
  
  let yazik=2;
  const bufer=document.getElementById('bufer');
  const button=document.getElementById('button');
  const textValue=document.getElementById('text');
  const ssil=document.getElementById('ssil');
  button.addEventListener('click', function() {
    let perevod="";
    let stroka=textValue.value;
    for (let char of stroka) {
      let isUp=false;
      if (!iskl.includes(char)){
        isUp=char.toUpperCase()==char;
        char=char.toLowerCase();
      }
      if (mapu.has(char) && yazik==1) char=mapu.get(char);
      if (yazik==2){
      for (let [key,value] of mapu) {
        if (value==char) {
          char=key;
          break;
        }
      }};
      if (isUp) char=char.toUpperCase(); 
      perevod+=char;
      
    };
    textValue.value=perevod;
    navigator.clipboard.writeText(textValue.value)
  .then(() => {
    bufer.innerHTML="Данная строка автоматически скопирована в буфер обмена для дальнейшей её вставки";
    setTimeout(()=>bufer.innerHTML="",3000);
  })
  .catch(err => {
    alert(err);
  });
    
  });
  textValue.onblur= function() {
    if (textValue.value!="") {
      ssil.style.top='-15px';
      ssil.style.fontSize='12px';
    } else {
      ssil.style.top='2px';
      ssil.style.fontSize='15px';
    };
  };
  textValue.onfocus=function() {
      ssil.style.top='-15px';
      ssil.style.fontSize='12px';
  };
  
  const engButton=document.getElementById('engButton');
  const rusButton=document.getElementById('rusButton');
  const leftImg=document.getElementById('leftImg');
  const rightImg=document.getElementById('rightImg');
  engButton.addEventListener('click',function() {
    leftImg.style.opacity=1;
    rightImg.style.opacity=0.3;
    yazik=1;
  });
  rusButton.addEventListener('click',function() {
    leftImg.style.opacity=0.3;
    rightImg.style.opacity=1;
    yazik=2;
  });
  
  