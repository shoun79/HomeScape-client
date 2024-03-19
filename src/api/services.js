//search homes

export const getSearchHomes = async (location, from, to, total_guest) => {
    const url = `${process.env.REACT_APP_API_URL}/search-homes?location=${location}&from=${from}&to=${to}&total_guest=${total_guest}`;
    const res = await fetch(url);
    const data = res.json();
    return data;
}

//add a home
export const addHome = async (homeData) => {
    const url = `${process.env.REACT_APP_API_URL}/homes`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {

            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('homeScape-token')}`
        },
        body: JSON.stringify(homeData)
    })
    const data = await res.json();
    return data;
}

//get all homes

export const getAllHomes = async () => {
    const url = `${process.env.REACT_APP_API_URL}/homes`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

//get all homes for host
export const getHomes = async email => {
    const url = `${process.env.REACT_APP_API_URL}/homes/${email}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('homeScape-token')}`
        }
    });
    const data = await res.json();
    return data;
}

//update home

export const updateHome = async (id, homeData) => {
    const url = `${process.env.REACT_APP_API_URL}/home/${id}`;
    const res = await fetch(url, {
        method: 'PUT',
        headers: {

            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('homeScape-token')}`
        },
        body: JSON.stringify(homeData)
    });
    const data = await res.json();
    return data;
}

//delete a home
export const deleteHome = async id => {
    const url = `${process.env.REACT_APP_API_URL}/home/${id}`;
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('homeScape-token')}`
        }
    });
    const data = await res.json();
    return data;
}