
export const fetchData = async (url)=>{
    return new Promise((resolve,reject) =>{
        fetch(url)
        .then((response) => response.json())
        .then(data=> resolve(data))
        .catch((err)=>{
            reject(err)
        })
    })

    
}

export const getPokemonRecord = async(url)=>{
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then((response) => response.json())
        .then(data=> resolve(data))
        .catch((err)=>{
            reject(err)
        })
    })
}

export const fetchDifferentUrl = async(url)=>{
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then((response) => response.json())
        .then(data=>resolve(data))
        .catch((err)=>{
            reject(err)
        })
    })
}

export const fetchPokemonOfType =  async(url)=>{
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then((response) => response.json())
        .then(data=>resolve(data))
        .catch((err)=>{
            reject(err)
        })
    })
}