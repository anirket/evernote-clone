
//post request

export const postRequest = async (url, payload) => {
    try {
        const data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(payload)
        })
        const text = await data.json();
        return text;
    } catch (error) {
        
        return {error:"some error"}
    }

}

//put request

export const putRequest = async (url, payload) => {
    try {
        const data = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(payload)
        })
        const text = await data.json();
        return text;
    } catch (error) {
        return {error:"some error"}
    }

}


//get request

export const getRequest = async (url) => {
    try {
        const data = await fetch(url)
        const text = await data.json();
        return text;
    } catch (error) {
        return {error:"some error"}
    }

}

//delete request

export const deleteRequest = async (url) => {
    try {
        const data = await fetch(url, {
            method: "delete"
        })
        const text = await data.json();

        return text;
    } catch (error) {
        return {error:"some error"}
    }

}