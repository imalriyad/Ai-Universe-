
const getAllToolsData = async() =>{
 const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
 const data = await res.json()
 displayAiDetails(data)
}


let aiData
let aiDataLength
 const displayAiDetails = (data) =>{
     aiData = data.data.tools  
     aiDataLength = aiData.length
     Showcard(aiData)
     
}
// Sorting
function sortingButton(){
  const sorted = aiData.sort((a, b) => new Date(a.published_in) - new Date(b.published_in))
  const cardContainer = document.getElementById('card-container')
  cardContainer.innerHTML = ''
  Showcard(sorted)
 }

  
  function Showcard(aiData){
    const cardContainer = document.getElementById('card-container')
    let numberOfCard = aiData.slice(0,6)
      numberOfCard.forEach(aiTools => {
            const card = document.createElement('div')
            card.innerHTML = `<div class="card bg-base-100 p-5 border-[1px] border-[#1111111A]">
            <figure class="border-[1px] border-[#1111111A] rounded-2xl">
              <img onerror="replaceImage(this)" src='${aiTools.image}' />
            </figure>
            <!-- Ai feature -->
            <div class="text-left mt-4">
              <h2 class="card-title text-2xl mb-4">Features</h2>
             <ol id="featuresList">
             <ol id="featuresList">
             ${aiTools.features.map(feature =>`<li class="list-inside list-decimal">${feature}</li>
             `).join('')} 
            </ol>
             </ol>
            </div>
            <hr class="bg-[#11111133] my-6">
            <!-- Ai Name -->
           <div class="text-left flex justify-between">
            
            <div>
            <h1 class="text-xl font-semibold">${aiTools.name}</h1>
            <!-- Date -->
            <p class="flex gap-2 mt-1"><span><img src="./date.svg" alt=""></span>${aiTools.published_in}</p>
            </div>
            <button onclick="modalHandaler('${aiTools.id}')"><img src="./Ellipse 1.png" alt=""></button>
            
          </div>
          </div>
            
            `

            cardContainer.appendChild(card)
         
           });
           spinner(false)
  }  

async function modalHandaler(aiToolsId){
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${aiToolsId}`)
    const data = await res.json()
    console.log(data.data.input_output_examples[0].input);   
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = ''
    const modal = document.createElement('div')
    modal.innerHTML =  `
    <dialog id="my_modal" class="modal">
    <form method="dialog" class="modal-box w-11/12 max-w-5xl">
      <div class="flex justify-between gap-4">
      <div class="bg-[#EB57570D] rounded-xl p-8 border-[1px] border-[#EB5757] text-left">
      <h3 class="font-bold text-lg">${data.data.description}</h3>
      
       <div class="flex-col mt-4">
    
       <div class="flex justify-between p-2">
       <div>${data.data.pricing[0].price}</div>
       <div>${data.data.pricing[1].price}</div>
       <div>${data.data.pricing[2].price}</div>

       </div>
       <div class="flex justify-between p-2">
      <div> ${data.data.pricing[0].plan}</div>
      <div> ${data.data.pricing[1].plan}</div>
      <div> ${data.data.pricing[2].plan}</div>
       </div>
         

       </div>

      <div class=" flex justify-between">
      <div class="mt-6 flex-1">
      <h1 class="text-2xl font-semibold">Features</h1>
      <ol class="list-inside list-disc mt-4">
      <li>${data.data.features['1'].feature_name}</li>
      <li>${data.data.features['2'].feature_name}</li>
      <li>${data.data.features['3'].feature_name}</li>
     </ol>
     </div>

     <div class="mt-6">
     <h1 class="text-2xl font-semibold">Integrations</h1>
     <ol class="list-disc mt-4">
     <li>${data.data.integrations[0]}</li>
     <li>${data.data.integrations[1]}</li>
     <li>${data.data.integrations[2]}</li>
    </ol>
    </div>
      </div>

       
      </div>
  
      <div class="border-[1px] border-[#E7E7E7] p-4 rounded-xl">
      <img class="rounded-xl" src='${data.data.image_link[0]}'/>
      <div>
       <h1 class="text-xl font-semibold mt-4">${data.data.input_output_examples[0].input}</h1>
       <p class="mt-4">${data.data.input_output_examples[0].output}</p>
      </div>
      </div>
      </div>
  
      <div class="mt-4 text-right">
        <button class="btn">Close</button>
      </div>
    </form>
  </dialog>
    
    `
    modalContainer.appendChild(modal)
    const modaal = document.getElementById('my_modal')
    modaal.showModal();

}

// Spinner
 function spinner(isLoading){
  const loadingSpinner = document.getElementById('loading-spinner')
  if (isLoading) {
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}

//  Show all button
function showAllButton(e){
   if (aiDataLength>6) {
    e.setAttribute('hidden',true)
   }
   else{
    e.removeAttribute('hidden')
    
   }
    Showcard(aiData.slice(7,aiData.length))
}

function replaceImage(targetElemnt) {
    targetElemnt.src = "./jsp.png"; 
    }

getAllToolsData()