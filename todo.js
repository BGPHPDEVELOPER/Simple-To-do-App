
var date
var storage,
    garbage = []
var methods = {

    save: function(value,date) {

        storage.push({value,date})
        localStorage.setItem('storage', JSON.stringify(storage))

        location.reload(true)
    },
    get: function() {

        storage = JSON.parse(localStorage.getItem('storage'))
        garbage = JSON.parse(localStorage.getItem('garbage'))
        if(!storage) storage = [] ; if(!garbage) garbage = []

        this.post()
    },
    update: function(index) {

        document.getElementById(index).style.display = 'none'

        garbage.push(storage[index].value)
        localStorage.setItem('garbage',JSON.stringify(garbage))
         
        storage.splice(index,1)
        localStorage.setItem('storage',JSON.stringify(storage))

        location.reload(false)
    },
    delete: function(index) {

        storage.splice(index,1)
        localStorage.setItem('storage',JSON.stringify(storage))

        location.reload(false)
    },
    deleteList: function(index) {

        localStorage.removeItem(index)
        location.reload(false)
    },
    post: function() {

        let elStorage = document.getElementById('storage-list')
        let elGarbage = document.getElementById('garbage-list')

        for(i in storage) {
            elStorage.innerHTML += `<div class='list-item' id='${i}'>
                <div class='wrapper'>
                    <span class='date'> ${storage[i].date}</span>
                    <span class='value'>${storage[i].value}</span>
                </div>
                <div id='options'>
                    <i class='fas fa-check' title='Завърши' onclick='methods.update(${i})'></i>
                    <i class="fas fa-times" id='dell' title='Изтрий' onclick='methods.delete(${i})' ></i>
                </div>               
            </div>`
        }    
        for(i in garbage) elGarbage.innerHTML += `<span class='garbage-item'>${garbage[i]} </span>`
    }
}
window.onload = function () { methods.get()

    document.getElementById('addToDo').addEventListener('change', function(){

    (function(upDate) {

       let mm = upDate.getMonth()
       let dd = upDate.getDate()
       let yy = upDate.getFullYear()

       switch(mm) {

        case 0  :  mm = 'Jan'  ; break
        case 1  :  mm = 'Feb'  ; break
        case 2  :  mm = 'Mar'  ; break
        case 3  :  mm = 'Apr'  ; break
        case 4  :  mm = 'May'  ; break
        case 5  :  mm = 'Jun'  ; break
        case 6  :  mm = 'Jul'  ; break
        case 7  :  mm = 'Aug'  ; break
        case 8  :  mm = 'Sep'  ; break
        case 9  :  mm = 'Oct'  ; break
        case 10 :  mm = 'Nov'  ; break
        case 11 :  mm = 'Dec'  ; break

        }

        date = (mm + ' ' + dd + ' ' +yy).toString()

        })(new Date()) ; methods.save(this.value,date)
    }),

    (function (storage,garbage){

        let elStorage = document.getElementById('counter-main')
        let elGarbage = document.getElementById('counter-footer')
        let storageCounter = storage.length
        let garbageCounter = garbage.length
        let both = storageCounter + garbageCounter
        let storagePercentage = (100 * storageCounter) / both
        let garbagePercentage = (100 * garbageCounter) / both

        elStorage.innerHTML = `${storageCounter}/${both} (${storagePercentage.toFixed(1)} %)`
        elGarbage.innerHTML = `${garbageCounter}/${both} (${garbagePercentage.toFixed(1)} %)`

    })(storage,garbage),

    (function() {

        if(storage.length < 1) document.getElementById('main').style.display = 'none'
        if(garbage.length < 1) document.getElementById('footer').style.display = 'none'
    })()
    
    document.getElementById('deleteList').addEventListener('click', function(){

        methods.deleteList('garbage')
    })
}
