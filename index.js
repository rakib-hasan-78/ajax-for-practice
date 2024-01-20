let cont = document.getElementById(`cont`)
let load = document.getElementById(`load`)
let postsList = document.getElementById(`posts`)


const URL = `https://jsonplaceholder.typicode.com/posts`


load.addEventListener(`click`, function(e){
    e.preventDefault()
    // * toggle button 

    const style = document.createElement(`style`)
    document.head.appendChild(style)
    style.textContent = `.active{display:none;}`

    postsList.classList.toggle(`active`)
    let isActive = postsList.classList.contains(`active`)

    if (isActive) {
        load.innerHTML = `Load Data`
    } else {
        load.innerHTML = `Hide It`
    }
    // * toggle Button Completed...

    fetch(URL)
    .then(response=>response.json())
    .then(posts=>{
        posts.forEach((post, index) => {
            let listItem = liGenerator(post.title , index+1)
            postsList.appendChild(listItem)
        })
    })
    .catch(e.message)
})

let liGenerator =(list, index) =>{
    const li = document.createElement(`li`)
    li.className = `list-group-item`
    li.innerHTML = `[${index}] ${list}`
    return li
} 

// ** post Method started...

const newForm = document.getElementById(`post-form`)
const postUlData = document.getElementById(`post-data`)
let alertMsg = document.getElementById(`alert-msg`)

let msg = alertMsg.textContent
let capitalize = `${msg.charAt(0).toLocaleUpperCase()}${msg.slice(1)}`
alertMsg.textContent = capitalize

newForm.addEventListener(`submit`, function (e) {
    e.preventDefault()
    let title = this.title.value || undefined
    let body = this.body.value || undefined
    if (title && body) {
        let dataObj = {
            userId: 780,
            title,
            body
        }
        fetch(URL, {
            method: `POST`,
            headers: {
                'content-type': `Application/JSON`
            },
            body: JSON.stringify(dataObj)
        })
        .then(response => response.json())
        .then((data) => {
            let d = liGenerating(data)
            postUlData.appendChild(d)
            alertMsg.style.display = `none`
            this.reset() // Change this line to reset the form
        })
        .catch(error => {
           console.log(error.message)
        })
    } else {
        alertMsg.style.display = `flex`
    }
})



let liGenerating = (list) => {
    let listItem = document.createElement(`li`)
    listItem.className = `list-group-item`
    listItem.innerText = `postId: ${list.id} PostTitle: ${list.title} Post: ${list.body} : Post this content by ${list.userId}`

    return listItem
}


// newForm.addEventListener('submit', function(e){
//     e.preventDefault()
//     let title = this.title.value ||undefined
//     let body = this.body.value ||undefined
//     if (title && body) {
//         let dataObj ={
//             userId: 104,
//             title,
//             body
//         }
//         fetch(URL, {
//             method: `POST`,
//             headers:{
//                 'content-type': 'Application/JSON'
//             },
//             body: JSON.stringify(dataObj)
//         })
//         .then(response=>response.json())
//         .then(data=>{
//             let liData = userPostData(data)
//             postUlData.appendChild(liData)
//             this.reset()
//         })
//         .catch(error=>console.log(error.message))
//     }
     
//     else {
//         alert(`invalid data or no data found..`)
//     }
// })

// let userPostData = (list)=>{

//     let li = document.createElement(`li`)
//     li.className = `list-group-item`
//     li.innerText = `${list.id} , ${list.title}, ${list.body}, post by userId : ${list.userId}`
//     return li
// }
