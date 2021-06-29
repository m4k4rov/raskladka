  let mapu=new Map([
    ["q","й"],["w","ц"],["e","у"],["r","к"],["t","е"],["y","н"],["u","г"],["i","ш"],["o","щ"],["p","з"],["{","Х"],["[","х"],["}","Ъ"],["]","ъ"],
    ["a","ф"],["s","ы"],["d","в"],["f","а"],["g","п"],["h","р"],["j","о"],["k","л"],["l","д"],[";","ж"],[":","Ж"],["'","э"],["\u0022","Э"],["|","/"],
    ["z","я"],["x","ч"],["c","с"],["v","м"],["b","и"],["n","т"],["m","ь"],[",","б"],["<","Б"],[".","ю"],[">","Ю"],["/","."],["?",","],["`","ё"],["~","Ё"]
  ]);
  let iskl=["[","{","]","}","х","Х","ъ","Ъ",";",":","ж","Ж","'","э","\u0022","Э",",","б","<","Б",".","ю",">","Ю","/",".","?",",","`","ё","~","Ё"];
  let yazik=2;
  const bufer=document.getElementById('bufer');
  const buttonCopy=document.getElementById('copy');
  const textValue=document.getElementById('text');
  const textPerevod=document.getElementById('text2');
  const ssil=document.getElementById('ssil');
  
  textValue.addEventListener('input', perevodRaskladki);
  
  function perevodRaskladki () {
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
    textPerevod.value=perevod;
  }

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
  const windowBuf=document.getElementById('winbuf');
  
  engButton.addEventListener('click',function() {
    leftImg.style.opacity=1;
    rightImg.style.opacity=0.3;
    yazik=1;
    if (textValue.value) perevodRaskladki();
  });
  
  rusButton.addEventListener('click',function() {
    leftImg.style.opacity=0.3;
    rightImg.style.opacity=1;
    yazik=2;
    if (textValue.value) perevodRaskladki();
  });

  buttonCopy.addEventListener('click', function () {
    try {
      if (textValue.value) {
        textPerevod.select();
        document.execCommand("copy");
        bufer.innerHTML="Данная строка автоматически скопирована в буфер обмена для дальнейшей её вставки";
        windowBuf.classList.remove('hide');
        setTimeout(()=>windowBuf.classList.add('hide'),3000);
      };
    } catch(err) {
      bufer.innerHTML=err;
      setTimeout(()=>windowBuf.classList.add('hide'),3000);
    };
  });
  
  