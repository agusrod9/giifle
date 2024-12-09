
const btn = document.getElementById("search");
const inpt = document.getElementById("gifBuscado");
const res = document.querySelector(".div__responseGifs");
const head = document.querySelector(".div__header");
const imgLogo = document.querySelector(".img__logo");
const imgViewer = document.querySelector(".viewer");
const body = document.querySelector(".body");
const colors = ["#e4f1fe","#8dc6ff","#22313f","#34495e", "#005792"];

const setearTexto=()=>{
    const aBuscar= document.getElementById("gifBuscado").value;
    return aBuscar
}

const populateImgs=(i, url)=>{
    let newDiv = document.createElement('div');
    let newImg = document.createElement('img');
    let randomColorIndex = Math.floor(Math.random() * 5);
    newDiv.setAttribute("class", "imgRes");
    newImg.setAttribute("style", `background-color: ${colors[randomColorIndex]}`)
    newImg.setAttribute('id',`imgRes${i}`);
    newImg.setAttribute("src",url);
    newDiv.appendChild(newImg);
    newDiv.addEventListener("click",()=>{
        showImgViewer(url);
    })
    res.appendChild(newDiv);
}

const clearPreviousSearch=()=>{
    for(let i=0;i=res.childElementCount;i++){
        res.removeChild(res.childNodes[i]);
    }
}

const showImgViewer=(url)=>{
    imgViewer.classList.add("div__imgViewer");
    body.classList.add("imgViewer-open");
    let img = document.querySelector(".viewerImg");
    img.setAttribute("src", url)
    let closeBtn = document.querySelector(".closeViewerBtn");
    closeBtn.addEventListener("click", ()=>{
        closeImgViewer();
    })
}

const closeImgViewer=()=>{
    imgViewer.classList.remove("div__imgViewer");
    body.classList.remove("imgViewer-open");
    let img = document.querySelector(".viewerImg");
    img.setAttribute("src", "");
}



btn.addEventListener("click",async()=>{
    let texto = setearTexto();
    if(texto!=""){
        head.classList.add("div__headerOnSearch");
        clearPreviousSearch();
        await fetch(`https://api.giphy.com/v1/gifs/search?api_key=IGbwHoGKML1AI7xMjOJMDIE01Apzj3C4&q=${texto}`)
        .then(Response => Response.json())
        .then(data => {for(let i=0; i< data.data.length;i++){
            let url = data.data[i].images.original.url
            populateImgs(i, url);
        }});
        } 
    }
)


inpt.addEventListener("keyup", async(e)=>{
    if(e.key ==="Enter" && e.target.value !=""){
    let texto = setearTexto();
    if(texto!=""){
        head.classList.add("div__headerOnSearch");
        clearPreviousSearch();
        await fetch(`https://api.giphy.com/v1/gifs/search?api_key=IGbwHoGKML1AI7xMjOJMDIE01Apzj3C4&q=${texto}`)
        .then(Response => Response.json())
        .then(data => {for(let i=0; i< data.data.length;i++){
            let url = data.data[i].images.original.url
            populateImgs(i, url);
        }});
        } 
        }
})

const addImgEvents=()=>{
    for(let i=0; i=imgResult.length;i++){
        imgResult.addEventListener("click", ()=>{
            console.log(`click en imágen ${i}`);
        })
    }
    
}

imgViewer.addEventListener("click", ()=>{
    closeImgViewer();
})

imgLogo.addEventListener("click", ()=>{
    location.reload();
})


