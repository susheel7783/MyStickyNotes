// const addButton = document.querySelector('#dd');
//we can do the same thing by document.getElementById
const addButton = document.getElementById('add')

const updateLocalStorageData=()=>{
    const textAreaData=document.querySelectorAll('textarea');
    const notes =[];
    // console.log(textAreaData)
    textAreaData.forEach((currEl)=>{
        // console.log(notes.push(currEl.value))
        return notes.push(currEl.value);
    })
    localStorage.setItem('notes', JSON.stringify(notes));
}




const addNewNote = (Text = "") => {

    let Note = document.createElement('div');
    Note.classList.add('note');


    const HtmlData = `
        <div class="operation" >
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
   
    <div class="main ${Text? "": "hidden"}"></div>
    <textarea class="${Text ? "hidden": "" }" ></textarea> `;

    Note.insertAdjacentHTML('beforeend', HtmlData)


    //Getting the references

    const editButton = Note.querySelector('.edit')
    const delButton = Note.querySelector('.delete')
    const mainDiv = Note.querySelector('.main')
    const writer = Note.querySelector('textarea')


    // adding the event listerner
    delButton.addEventListener('click', ()=>{
        Note.remove();
        updateLocalStorageData();
    })

    //Toggle using the editButton
    writer.value= Text;
    mainDiv.innerHTML= Text;

    editButton.addEventListener('click', ()=>{
        mainDiv.classList.toggle('hidden');
        writer.classList.toggle('hidden');
    })

    writer.addEventListener('change', (e)=>{

        const Value = e.target.value;
        // console.log(Value)
        mainDiv.innerHTML=Value;

        //fucntion to store the data in local storage is called
        updateLocalStorageData();
    })

    //Append the create HTml data into the body 
    document.body.appendChild(Note);

    
}

//Getting Data from local storage
const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){
    notes.forEach((currEl)=>addNewNote(currEl))
}

addButton.addEventListener('click', () => addNewNote());
